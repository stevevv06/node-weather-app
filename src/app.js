const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Enable HBS (handlebars for express)
app.set('view engine', 'hbs')
//setup views location
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'the name'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'the name'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'the name',
        helpMessage: 'A help message'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                address: address,
                forecast: forecastdata,
                location: location
            })
          })
    })  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'the name',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'the name',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})