const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7cc01c5af069376595024dc5ad46ad37&query=' 
    + encodeURIComponent(latitude) + ',' 
    + encodeURIComponent(longitude)
    request(
        {
            url, 
            json: true
        }, 
        (error, {body}) => {
            if(error) {
                callback('Unable to connect to weather service', undefined)
            } else if(body.error) {
                callback('Unable to find weather, please try with another search term', undefined)
            } else if (body.data){
                callback('No results found for search term', undefined)
            } else {
                callback(undefined, 
                    'It is currently '+body.current.temperature+' degress out. It feels like '+body.current.feelslike+' degress out')              
            }
        }
    )
}

module.exports = forecast