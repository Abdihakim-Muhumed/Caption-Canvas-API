const express = require('express');
const controller = require('../controllers/auth.controller');
const {validateMiddlewares} = require('../middlewares')
const authRouter = express.Router();

authRouter.post(
    '/signup',
    validateMiddlewares.validateAuth, 
    controller.signUp
    );
authRouter.post(
    '/signin',
    validateMiddlewares.validateAuth, 
    controller.signIn);
authRouter.get('/signout', controller.signOut);

module.exports = authRouter;