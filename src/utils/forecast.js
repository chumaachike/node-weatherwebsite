const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9fcea57a13359e666ae3063bebe4c9af&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true }, (error, response) => {
        const {err, current:{weather_descriptions,temperature} } = response.body;
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (err) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, weather_descriptions[0] + ". It is currently " + temperature + " degress out.")
        }
        
    })

}

module.exports = forecast