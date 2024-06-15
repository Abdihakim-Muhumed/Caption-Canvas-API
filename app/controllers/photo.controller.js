const db = require("../models");
const Photo = db.photo;


const getAllPhotos = async (req, res) => {
    const photos = await Photo.findAll();
    res.status(200).json(photos);
}


module.exports = {
    getAllPhotos,
}