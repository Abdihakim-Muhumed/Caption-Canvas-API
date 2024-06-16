const express = require('express');
const controller = require('../controllers/caption.controller');

const captionRouter = express.Router();

captionRouter.get('/:photoId', controller.getPhotoCaptions);

module.exports = captionRouter