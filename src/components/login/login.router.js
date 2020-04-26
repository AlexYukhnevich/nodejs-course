const loginRouter = require('express').Router();
const { checkLogin } = require('./login.controller');

loginRouter.post('/', checkLogin);
module.exports = loginRouter;
