const db = require("../models");
const Photo = db.photo;


const getAllPhotos = async (req, res) => {
    const photos = await Photo.findAll();
    res.status(200).json(photos);
}

const getPhotoById =  (req, res) => {
    Photo.findByPk(req.params.id)
    .then(photo => {
        if(photo === null) {
            res.status(404).send({
                message: "Photo not found!"
            })
        }
        res.status(200).json({
            photo: photo,
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    });

}
const addPhoto = (req, res) => {
    const {photo_url, description} = req.query

    Photo.create({
        photo_url: photo_url, 
        description:description
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

module.exports = {
    getAllPhotos,
    addPhoto,
    getPhotoById
}