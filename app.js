const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const path = require('path')
const ejs = require('ejs');
const fs = require('fs');
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
app.use(fileUpload())

//routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos
    })
})
//routes
app.get('/about', (req, res) => {
    res.render('about')
})

// id parametre
app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    })
})
app.get('/add', (req, res) => {
    res.render('add')
})
app.post('/photos', async (req, res) => {
    // console.log(req.files.image)
    // await Photo.create(req.body)
    // res.redirect('/')//index'e yönlendir

    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name
        })
        res.redirect('/');
    })
});


const port = 1000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalıştırıldı.`)
})