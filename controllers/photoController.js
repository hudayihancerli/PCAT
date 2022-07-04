const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    // console.log(req.query)
    // const photos = await Photo.find({}).sort('-dateCreated')

    const page = req.query.page || 1;
    const PhotosPerPage = 3;

    const totalPhotos = await Photo.find().countDocuments();
    const photos = await Photo.find({})
        .sort('-dateCreated')
        .skip((page - 1) * PhotosPerPage)
        .limit(PhotosPerPage)
    res.render('index', {
        photos: photos,
        current: page,
        pages: Math.ceil(totalPhotos / PhotosPerPage)
    })

}

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    })
}

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name
        })
        res.redirect('/');
    })
}

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect('/')
}