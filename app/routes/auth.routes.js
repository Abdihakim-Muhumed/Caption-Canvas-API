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
        query('password').isLength({min: 8}).withMessage("Invalid password!Password should be atleast 8 characters long!"),
    ],
    validators.validateAuth,
    controller.signUp
    );
authRouter.post(
    '/signin',
    [
        query('username').isAlphanumeric().withMessage("Invalid Username"),
        query('password').isAlphanumeric().withMessage("Invalid password!"),
    ],
    controller.signIn);
authRouter.get('/signout', controller.signOut);

module.exports = authRouter;