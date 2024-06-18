const express = require('express');
const controller = require('../controllers/caption.controller');
const {authMiddlewares} = require('../middlewares');
const captionRouter = express.Router();

captionRouter.get('/:photoId', controller.getPhotoCaptions);
captionRouter.post('/:photoId', authMiddlewares.verifyToken, controller.addNewCaption);
captionRouter.put('/:captionId', authMiddlewares.verifyToken, controller.updateCaption);
captionRouter.delete('/:captionId', authMiddlewares.verifyToken, controller.deleteCaption);

module.exports = captionRouter