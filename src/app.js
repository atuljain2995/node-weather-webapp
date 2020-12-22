const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Atul Jain'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Atul Jain'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Atul Jain'
    })
})

app.get('/weather',(req,res)=>{
    const search = req.query.search
    if(!req.query.search)
    {
        return res.send({error:'You must provide search field'})
    }

    geocode(search,(error,{latitude,longitude,location} ={} )=>{

        if(error){
            return res.send("Error")
        }
    
        forecast(latitude,longitude, (error, forcastData) => {
            if(error){
                return res.send({error})
            }
            res.send({Location: location,Forecast: forcastData})
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{error:'Help article not found'})
})

app.get('/about/*',(req,res)=>{
    res.render('404',{error:'About not found'})
})

app.get('*',(req,res)=>{
    res.render('404',{error:'404 not found'})
})


app.listen(port, () => {
    console.log("Server started on port"+port)
})