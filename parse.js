const axios =  require("axios");
const fs = require('fs');



function create(filename){
    fs.writeFileSync(filename, "", err =>{});
}

function write(path_to_file, content){
    fs.writeFileSync(path_to_file, content, { flag: 'a' }, err => {
        if (err) {
          console.error(err);
        }
    });
    
}

async function parse(){
    create('wallets.txt');
    let response;
    await axios.get('https://grimace.tech/api/players-0ee6d43502a1f05773e21f561a1a6063', {
        headers:{
            password: process.env.PASSWORD
        }
    }).then(res =>{
        response = (res.data.bestPlayers.map(e=>{
            return {
                address: e.address,
                score: e.score
            }
        }));
    })
    for(let i = 0; i < response.length; i++){
        write('wallets.txt', response[i].address + ' ' + response[i].score + (i !== response.length - 1 ? '\n' : ''))
    }
}


module.exports = {parse}