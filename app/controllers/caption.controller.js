const db = require('../models');
const Photo = db.photo;
const Caption = db.caption;


const getPhotoCaptions = (req, res) => {
    Photo.findByPk(req.params.photoId)
    .then(photo => {
        if(!photo){
            res.status(404).json({
                message: "Photo does not exist!"
            })
        }
        photo.getCaptions().then(captions => {
            res.status(200).json({
                captions: captions,
            })
        })
    })
}

const addNewCaption = (req, res) => {
    const captionBody = req.query.captionBody;
    const photoId = req.params.photoId;

    Photo.findByPk(photoId)
    .then(photo => {
        if(!photo){
            res.status(403).json({
                message: "Cannot add caption to a non-existant photo"
            })
        }
        Caption.create({
            body: captionBody,
            photoId: photoId
        })
        .then(caption => {
            res.status(201).json({
                caption: caption,
                photo: photo
            })
        })
        .catch( err => {
            res.status(500).json({
                message: err.message
            })
        })

    })

}


module.exports = {
    getPhotoCaptions,
    addNewCaption,
}