const request = require('request')


const geocode = (address,callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1Ijoic2hhdW5kaWsiLCJhIjoiY2p3YTdmbmZxMDZ6YTQ5bzZva2pjdTJkNyJ9.rwbokvvOStLsDLU_A7QsDg'

    request({url,json:true}, (error,response) => {
        if(error){
            callback('Unable to connect geocoding services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Address not found try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude :response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode 
// here we not exporting a object but just a single function in the app.js it can be 'required' 
// using any name of our choice and we can call the fn in this file using that name.In case 
// we export an object we will have to use the nameused in app.js dot the function(object attribute)
// see notes-node folder for references.