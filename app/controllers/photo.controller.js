const db = require("../models");
const Photo = db.photo;
const Caption = db.caption;


const getAllPhotos = async (req, res) => {
    const photos = await Photo.findAll();
    res.status(200).json(photos);
}

const getPhotoById =  (req, res) => {
    Photo.findByPk(req.params.photoId)
    .then(photo => {
        if(photo === null) {
            res.status(404).send({
                message: "Photo not found!"
            })
        }

        photo.getCaptions()
        .then(captions => {
            res.status(200).json({
                photo: photo,
                captions: captions
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    });

}
const addPhoto = (req, res) => {
    const {photo_url, description} = req.query
    const id = req.headers["user-id"]
    Photo.create({
        photo_url: photo_url, 
        description:description,
        userId: id
    })
    .then(photo => {
        res.status(201).json({
            photo: photo
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    });
}

const deletePhoto = (req, res) => {
    Photo.findByPk(req.params.photoId)
    .then(photo => {
        if(!photo){
            res.status(403).json({
                message: "Invalid photo id"
            })
        }
        photo.destroy({
            truncate: true
        })
        .then(() => {
            res.status(200).json({
                message: "Photo successfully deleted!"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
        
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
    
}

module.exports = {
    getAllPhotos,
    addPhoto,
    getPhotoById,
    deletePhoto
}