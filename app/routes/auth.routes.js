const express = require('express');
const controller = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', controller.signUp);

module.exports = authRouter;