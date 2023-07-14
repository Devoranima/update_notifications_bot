const fs = require('fs');

const ids = fs.readFileSync('./addresses.txt').toString().split(/[\r,\n]+/).filter(e => e != '');

const start = 'INSERT INTO leaderboard(address, score) VALUES'
let result = start;

const amount = 50; 
const offset = 75;
const leftBorder = offset+1;
const rightBorder = offset+amount;

for (let i = leftBorder; i <= rightBorder; i++){
    const address = ids[i-1];
    const im = Math.round(Math.random()*4 + 1);
    const jm = Math.round(Math.random()*9 + 1);
    let a = 0;
    for (let i = 1; i<=im; i++){
        for (let j = 1; j <= (i !== im? 10 : jm); j++){
            a+=i*j;
        }
    }
    const newSex = " ('"+address+"', "+a+")" + (i!==rightBorder? "," : ";");
    result+=newSex;
}

console.log(result);