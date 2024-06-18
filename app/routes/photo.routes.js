const express = require("express");

const photoRouter = express.Router();

const controller = require('../controllers/photo.controller')
const {authMiddlewares} = require('../middlewares');

photoRouter.get('/', controller.getAllPhotos)
photoRouter.post('/', authMiddlewares.verifyToken, controller.addPhoto)
photoRouter.get('/:photoId', controller.getPhotoById)
photoRouter.delete('/:photoId', authMiddlewares.verifyToken, controller.deletePhoto)

module.exports = photoRouter;