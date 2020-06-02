const request = require("request");

const foreCast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=cda36e75f3baccfe572341b7dd46356c&query=" + lat + 
    "," + long + "&units=m";

    request({url, json: true}, (error, {body}) => {
            if(error) {
                callback("Unable to connect weather stack server", undefined);
            }
            else if(body.error) {
                callback("Unable to find location", undefined);
            }
            else {
                callback(undefined, body.current.weather_descriptions[0] + ". Current temperature is " +
                body.current.temperature + " but it feels like " + body.current.feelslike);
            }
    });
}

module.exports = foreCast;