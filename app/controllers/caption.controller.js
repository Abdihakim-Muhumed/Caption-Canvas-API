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


module.exports = {
    getPhotoCaptions
}