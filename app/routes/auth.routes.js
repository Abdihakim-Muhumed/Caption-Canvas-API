const express = require('express');
const controller = require('../controllers/auth.controller');
const {validators} = require('../middlewares');
const{query} = require('express-validator');
const authRouter = express.Router();

authRouter.post(
    '/signup',
    [
        query('username').isAlphanumeric().withMessage("Invalid Username"),
        query('email').isEmail().withMessage("Invalid Email Address"),
        query('password').isAlphanumeric().withMessage("Invalid password!"),
    ],
    validators.validateAuth,
    controller.signUp
    );
authRouter.post(
    '/signin',
    controller.signIn);
authRouter.get('/signout', controller.signOut);

module.exports = authRouter;