const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

//connect Db
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//templae engine
app.set("view engine", "ejs")

//middelewares
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })) // url'deki datayı okuyor

app.use(express.json()) // url'deki datayı json'a çeviriyor

//routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({})
    res.render('index', {
        photos
    })
})
//routes
app.get('/about', (req, res) => {
    res.render('about')
})
//routes
app.get('/add', (req, res) => {
    res.render('add')
})
//routes
app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')//index'e yönlendir
});


const port = 1000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalıştırıldı.`)
})