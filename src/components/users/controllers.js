const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const userService = require('./user.service');
const User = require('./user.model');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    return !users
      ? next(NOT_FOUND)
      : res.status(OK).send(users.map(User.sendResponse));
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.get(req.params.userId);
    return !user
      ? next(NOT_FOUND)
      : res.status(OK).send(User.sendResponse(user));
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(OK).send(User.sendResponse(user));
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.userId, req.body);
    res.status(OK).send(User.sendResponse(user));
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.delete(req.params.userId);
    return !user
      ? next(NOT_FOUND)
      : res.status(NO_CONTENT).send('User has been successfully deleted');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
