const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    url = "http://api.weatherstack.com/current?access_key=ee8775ea82312b2b129c273f8b3f01d4&query=" + lat + ',' + lon 
    request({url, json: true}, (error, {body} = {})=>{
        if(error){
            callback('Unable to connect to the weather service!', undefined)
         }
         else if(body.error){
            callback('Unable to find location!', undefined)
         }
      
         else{
            callback(undefined, "Currently it is " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees.")
         }
    }) 
} 

module.exports = forecast