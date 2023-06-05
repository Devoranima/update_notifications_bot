const axios =  require("axios");
const fs = require('fs');

const PASSWORD = 'odyssey_wen_listing_sir';
const PASSWORD_RESET = "oh_shit_i_am_sorry__sorry_for_what__our_daddy_told_us_not_to_be_ashamed_of_our_grimace";

(async function(){
    setInterval(() => {
        var now = new Date();
        var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0, 0) - now;
        if (millisTill10 < 0) {
            millisTill10 += 86400000; // it's after 7pm, try 7pm tomorrow.
        }
        setTimeout(async ()=>{
            await parse();
            await clearDB();
        }, millisTill10);
    }, 86400000);
})()



async function parse(){
    create('wallets.txt');
    let response;
    await axios.get('https://grimace.tech/api/players-0ee6d43502a1f05773e21f561a1a6063', {
        headers:{
            password: 'odyssey_wen_listing_sir'
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

async function clearDB (){
    await axios.put('https://grimace.tech/api/leaderboard-reset-sdyhkljakrmcgwudmacmdai992219123caddcwar',{},{
        headers: {
            password: "oh_shit_i_am_sorry__sorry_for_what__our_daddy_told_us_not_to_be_ashamed_of_our_grimace"
        }
    }).then(res =>{
        if (res.status === 200) console.log('Cleared successfully');
        else console.log(res.status, 'An error occurred');
    }).catch(e=>{
        console.log(e);
    })
}


const create = (filename) => {
    fs.writeFileSync(filename, "", err =>{});
}

const write = (path_to_file, content) => {
    fs.writeFileSync(path_to_file, content, { flag: 'a' }, err => {
        if (err) {
          console.error(err);
        }
    });
}