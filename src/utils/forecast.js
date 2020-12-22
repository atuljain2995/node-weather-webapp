const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=f7b274eb5e6564852840a7fe9cf83a79&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to internet',undefined)
        }
        else if(body.error)
        {
            callback('Request failed. Please try again with different location',undefined)
        }
        else{
            const loc = body.current
            console.log(loc)
            callback(undefined,
                loc.weather_descriptions+' today. Temperature is '+loc.temperature+' , but it feels like '+
                loc.feelslike + '. Humidity is '+loc.humidity+'%.')
        }
    })
}

module.exports = forecast