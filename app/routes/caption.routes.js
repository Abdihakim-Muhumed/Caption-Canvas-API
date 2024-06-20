const express = require('express');
const controller = require('../controllers/caption.controller');
const {authMiddlewares} = require('../middlewares');
const captionRouter = express.Router();

captionRouter.get('/:photoId', controller.getPhotoCaptions);
captionRouter.post(
    '/:photoId', 
    [
        authMiddlewares.verifyToken, 
        authMiddlewares.isContestant
    ],
    controller.addNewCaption
    );
captionRouter.put(
    '/:captionId',
    [
        authMiddlewares.verifyToken, 
        authMiddlewares.isCaptionOwner,
    ],
    controller.updateCaption
    );
captionRouter.delete(
    '/:captionId', 
    [
        authMiddlewares.verifyToken,
        authMiddlewares.isCaptionOwner
    ],
    controller.deleteCaption);

module.exports = captionRouter