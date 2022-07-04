const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

//connect Db
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
})

//templae engine
app.set("view engine", "ejs")

//middelewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // url'deki datayı okuyor
app.use(express.json()) // url'deki datayı json'a çeviriyor
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);



const port = 1000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalıştırıldı.`)
})