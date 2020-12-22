const request = require('request')

const geoCodeValue = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXR1bGphaW4yOTk1IiwiYSI6ImNraXU0ZmhzMDEyMXAyeW40NWliamlia2wifQ.z-vRcU7Rft1aowHo_aHy9g&limit=1'

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to internet',undefined)
        }
        else if(body.features === undefined){
            callback('location is undefined',undefined)
        }
        else if(body.features.length === 0){
            callback('Cannot find the location, please try with other keyword',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geoCodeValue