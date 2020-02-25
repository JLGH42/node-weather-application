const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e1f1aa5509b93f9cdc163ba114a6a772/${latitude},${longitude}?units=si`
    request({
        url,
        json: true
    }, (err, { body }) => {
        if (err) {
            callback('Unable to Connect to DarkSkyAPI', undefined)
        } else if (body.err) {
            callback('Unable to make request, check URL input', undefined)
        } else {
            callback(undefined, `It is currently ${body.currently.temperature} degrees celcius, with a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast;