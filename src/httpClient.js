import axios from 'axios';
const url = "https://api.sportsdata.io/v3/nba/scores/json/Player/20000571";


export function getPlayerData() {
    axios.get(url, {
        headers: {
            "Ocp-Apim-Subscription-Key": "57dd407d1ef744858ce498a1e9f8d8fe"
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