const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocodes = require('./utils/geocode')
const forecasts = require('./utils/forecast')

//console.log(__dirname)   //prints the path of the current directory

const app = express()

const port = process.env.PORT || 3000

//Defines path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname,'../templates/views')  //bcz we changed the name of views dir to templates
const partialsDirPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Naman'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Naman'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        helpText:'this is some useful help',
        name:'Naman'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocodes(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecasts(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address:req.query.address,
                location,
                forecast:forecastData
            })
        })
    })

})

app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'u mst provide search'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'ERROR 404',
        text:' - help article not found',
        name:'Naman'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'ERROR 404',
        text:'- page not found',
        name:'Naman'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})