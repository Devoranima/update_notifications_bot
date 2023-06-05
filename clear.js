const axios =  require("axios");


(async function (){
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
})()

module.exports = {}