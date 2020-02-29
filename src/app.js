const express = require('express');
const app = express();
const hbs = require('hbs');
const server_port = process.env.port || 3001
const server_host = process.env.YOUR_HOST || '127.0.0.1';
const geoCoding = require('./utils/geoCoding');
const forecast = require('./utils/forecast');

const path = require('path');

//configure which dir express to serve files from
const public = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', path.join(viewsPath))

hbs.registerPartials(partialsPath)

//static file configuration
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome Page',
        name: 'Jordan Lyn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jordan Lyn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!!',
        msg: 'If you need help, call 999',
        name: 'Jordan Lyn'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    //check the query is there
    if (!address) {
        //return ends program if statement runs
        return res.send({
            error: 'You must provide an address'
        })
    }
    //geocode the given location
    geoCoding(address, (err, {
        longitude,
        latitude,
        locationName
    } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                address,
                location: locationName,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide a search term in the query',
        })
    }
    res.send({
        products: [],
    })
})

// if nothing matches on help search route
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan',
        error: 'Help article not found'
    })
})

//404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan',
        error: 'Page not found.'
    })
})

app.listen(server_port, server_host, () => {
    console.log(`App running at port ${server_port}`)
})