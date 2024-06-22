const express = require('express');
const controller = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', controller.signUp);
authRouter.post('/signin', controller.signIn);
authRouter.get('/signout', controller.signOut);

module.exports = authRouter;