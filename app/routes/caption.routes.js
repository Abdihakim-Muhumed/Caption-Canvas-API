const express = require('express');
const controller = require('../controllers/caption.controller');

const captionRouter = express.Router();

captionRouter.get('/:photoId', controller.getPhotoCaptions);
captionRouter.post('/:photoId', controller.addNewCaption);
captionRouter.put('/:captionId', controller.updateCaption);

module.exports = captionRouter