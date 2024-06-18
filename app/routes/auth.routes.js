const express = require('express');
const controller = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', controller.signUp);
authRouter.post('/signin', controller.signIn);

module.exports = authRouter;