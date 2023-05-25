const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=05fe8acd0001c7d9affb6c7e9d302755&query=' + encodeURIComponent(address)
    request(
        {
            url, 
            json: true
        }, 
        (error, {body}) => {
            if(error) {
                callback('Unable to connect to position service', undefined)
            } else if(body.error) {
                callback('Unable to find position, please try with another search term', undefined)
            } else if (body.data.length === 0){
                callback('No results found for search term', undefined)
            } else {
                callback(undefined, {
                    latitude: body.data[0].latitude,
                    longitude: body.data[0].longitude,
                    location: body.data[0].label
                })
            }
        }
    )
}

module.exports = geocode