const axios =  require("axios");

const PASSWORD_RESET = "oh_shit_i_am_sorry__sorry_for_what__our_daddy_told_us_not_to_be_ashamed_of_our_grimace";

(async function (){
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
})()

module.exports = {}