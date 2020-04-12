const userService = require('./user.service');
const User = require('./user.model');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

const getUsers = async (req, res, next) => {
  const users = await userService.getAll();
  return !users
    ? next(NOT_FOUND)
    : res.status(OK).json(users.map(User.sendResponse));
};

const getUser = async (req, res, next) => {
  const user = await userService.get(req.params.userId);
  return !user ? next(NOT_FOUND) : res.status(OK).json(User.sendResponse(user));
};

const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(OK).json(User.sendResponse(user));
};

const updateUser = async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  res.status(OK).json(User.sendResponse(user));
};

const deleteUser = async (req, res, next) => {
  const user = await userService.delete(req.params.userId);
  return !user ? next(NOT_FOUND) : res.status(NO_CONTENT);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
