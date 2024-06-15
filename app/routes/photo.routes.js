const express = require("express");

const photoRouter = express.Router();

const controller = require('../controllers/photo.controller')

photoRouter.get('/', controller.getAllPhotos)

module.exports = photoRouter;