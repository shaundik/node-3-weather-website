const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/a1f8c48242d95e5a1d13606678f06256/' + latitude + ',' + longitude + '?units=si'

    request({url,json:true}, (error,{body}) => { // object destructuring property of es6 used here can used in same way in geocode.js
        if(error){
            callback('Unable to connect weather services',undefined)
        }
        else if(body.error){
            callback(body.error,undefined)
        }
        else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} 
            degrees out and there is a ${body.currently.precipProbability} probablity of rain.The maximum 
            temperature for the day is ${body.daily.data[0].temperatureHigh} degree celsius and the minimum
             temperature for the day is ${body.daily.data[0].temperatureLow} degree celsius.`)
        }
    })
}

module.exports = forecast