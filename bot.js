const { Telegraf, Input} = require('telegraf');
const fs = require('fs');
const axios =  require("axios");

require('dotenv').config();



const va_id = 471347016;
const my_id = 794512801;

const DEBUG = false;

const ids = DEBUG ? [my_id] : [va_id, my_id];

(async function(){
    await main();
})()


async function main(){
    const bot = new Telegraf(process.env.BOT_TOKEN);
    bot.start((ctx) => {
        ctx.reply('Welcome, Stranger!');
        console.log(ctx.chat);
    });

    bot.launch();
    const date = new Date();
    console.log('Bot started at ' + date.getHours() + ":" + date.getMinutes());

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    await updateLeaderBoard(bot);
    setInterval(async () => {
        await updateLeaderBoard(bot);
    }, 7*24*60*60*1000);
}


async function updateLeaderBoard(bot){
    var now = new Date();

    const days = 7 - now.getUTCDay();
    const hours = 24 - now.getUTCHours();
    const minutes = 60 - now.getUTCMinutes();
    const seconds = 60 - now.getUTCSeconds();

    const time_left = (((days*24 + hours)*60 + minutes)*60 + seconds)*1000;

    setTimeout(async ()=>{
        const date = new Date(); 
        const date_message = date.getDate() +'.' + (date.getMonth()+1) + '.'+ date.getFullYear();
        const filePath = './results/'+date_message+'.txt';
        await parse(filePath);
        await clearDB();
        await sendNotification(bot, date_message, filePath);
    }, time_left);
}

async function sendNotification(bot, date_message, filePath){
    for(let i = 0; i < ids.length; i++){
        bot.telegram.sendMessage(ids[i], "Leaderboard update " + date_message);
        bot.telegram.sendDocument(ids[i], Input.fromLocalFile(filePath));
    }
}

async function parse(filePath){
    create(filePath);
    let response;
    await axios.get('https://grimace.tech/api/players-0ee6d43502a1f05773e21f561a1a6063', {
        headers:{
            password: process.env.PASSWORD
        }
    }).then(res =>{
        response = (res.data.bestPlayers.map(e=>{
            return {
                address: e.address,
                score: e.score,
                ip: e.ip
            }
        }));
    })
    for(let i = 0; i < response.length; i++){
        write(filePath, response[i].address + ' ' + response[i].score + ' ' + response[i].ip + (i !== response.length - 1 ? '\n' : ''))
    }
}

async function clearDB (){
    await axios.put('https://grimace.tech/api/leaderboard-reset-sdyhkljakrmcgwudmacmdai992219123caddcwar',{},{
        headers: {
            password: process.env.PASSWORD_RESET
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