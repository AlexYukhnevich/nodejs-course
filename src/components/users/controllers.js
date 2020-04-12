const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const userService = require('./user.service');
const User = require('./user.model');

const getUsers = async (req, res, next) => {
  const users = await userService.getAll();
  if (!users) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = users.map(User.sendResponse);
  }
  next();
};

const getUser = async (req, res, next) => {
  const user = await userService.get(req.params.userId);
  if (!user) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = User.sendResponse(user);
  }
  next();
};

const createUser = async (req, res, next) => {
  const user = await userService.create(req.body);
  res.info = OK;
  res.payload = User.sendResponse(user);
  next();
};

const updateUser = async (req, res, next) => {
  const user = await userService.update(req.params.userId, req.body);
  res.info = OK;
  res.payload = User.sendResponse(user);
  next();
};

const deleteUser = async (req, res, next) => {
  const user = await userService.delete(req.params.userId);
  if (!user) {
    res.info = NOT_FOUND;
  } else {
    res.info = NO_CONTENT;
    res.payload = { message: 'User has been successfully deleted' };
  }
  next();
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
