const authRouter = require('express').Router();
const { checkLogin } = require('./auth.controller');

authRouter.post('/', checkLogin);
module.exports = authRouter;
