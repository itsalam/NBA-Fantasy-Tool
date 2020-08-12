import axios from 'axios';


export function getPlayerDataById(id) {
    
    const url = `https://api.sportsdata.io/v3/nba/scores/json/Player/${id}`;
    console.log(process.env.API-KEY)
    axios.get(url, {
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.API-KEY
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

// Make a .env file on the root folder and paste this, and delete this comment after 

// API-KEY=57dd407d1ef744858ce498a1e9f8d8fe