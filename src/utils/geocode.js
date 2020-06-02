const request = require("request");

const getCode = (loc, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ loc +".json?access_token=pk.eyJ1IjoiYWtzaGF5ZWsiLCJhIjoiY2s5YjE5dGJzMDBiMjNocGF6bnh5Y3Y2bSJ9.5a6tL9U9Y0VGkcnNLzz-LQ";
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect mapbox server", undefined);
        }
        else if(body.features.length === 0) {
            callback("Unable to find location", undefined);
        }
        else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0]
        callback(undefined, {
            "latitude": body.features[0].center[1],
            "longitude": body.features[0].center[0],
            "location": body.features[0].place_name
        });
        }
    });
}

module.exports = getCode;