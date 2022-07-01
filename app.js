const express = require('express');
const path = require('path')
const ejs = require('ejs');

const app = express();

//templae engine
app.set("view engine", "ejs")

//middelewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})
//routes
app.get('/about', (req, res) => {
    res.render('about')
})
//routes
app.get('/add', (req, res) => {
    res.render('add')
})



const port = 1000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalıştırıldı.`)
})