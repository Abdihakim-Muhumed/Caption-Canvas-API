const express = require("express");

const photoRouter = express.Router();

const controller = require('../controllers/photo.controller')

photoRouter.get('/', controller.getAllPhotos)
photoRouter.post('/', controller.addPhoto)
photoRouter.get('/:photoId', controller.getPhotoById)
photoRouter.delete('/:photoId', controller.deletePhoto)

module.exports = photoRouter;