const path = require('path')
const express = require('express')
const hbs = require('hbs')



const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Amey Gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:'Amey Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        message:'Hello, How may I help you',
        name:'Amey Gupta'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        page: 'Help Article',
        title: '404',
        name: 'Amey Gupta'
    })
})

app.get('/weather', (req, res) => {
    



    if(!req.query.address){
        return res.send({
            error: " Please provide a location!" 
        })
    }

    geocode(req.query.address, (error, {latitude, location, longitude} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        else{
           forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            else{
                res.send({
                    address: req.query.address,
                    location: location,
                    forecast: forecastData 
                })
            }
        })
        }       
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('404',{
        page: 'About Article',
        name: 'Amey Gupta',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        page: 'Article',
        title: '404',
        name: 'Amey Gupta'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})