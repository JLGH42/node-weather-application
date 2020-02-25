const request = require('request')

const geoCoding = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3JpbWV5IiwiYSI6ImNrNmRsdG1tbDA1bTgzZm1xcWdidzJ2b2EifQ.Dbt3qQe9ywMuNeeYOqEnEQ`
    request({ url: geoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to Connect to Mapbox API', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, enter a valid address', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                locationName: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCoding