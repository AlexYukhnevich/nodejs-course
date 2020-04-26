const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const userService = require('./user.service');
const User = require('./user.model');
const catchError = require('../../middlewares/catch-error.middleware');

const getUsers = catchError(async (req, res, next) => {
  const users = await userService.getAll();
  return !users
    ? next(NOT_FOUND)
    : res.status(OK).send(users.map(User.sendResponse));
});

const getUser = catchError(async (req, res, next) => {
  const user = await userService.get(req.params.userId);
  return !user ? next(NOT_FOUND) : res.status(OK).send(User.sendResponse(user));
});

// eslint-disable-next-line no-unused-vars
const createUser = catchError(async (req, res, next) => {
  const user = await userService.create(req.body);
  res.status(OK).send(User.sendResponse(user));
});

// eslint-disable-next-line no-unused-vars
const updateUser = catchError(async (req, res, next) => {
  const user = await userService.update(req.params.userId, req.body);
  res.status(OK).send(User.sendResponse(user));
});

const deleteUser = catchError(async (req, res, next) => {
  const user = await userService.delete(req.params.userId);
  return !user
    ? next(NOT_FOUND)
    : res.status(NO_CONTENT).send('User has been successfully deleted');
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
