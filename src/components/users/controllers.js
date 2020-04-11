const userService = require('./user.service');
const User = require('./user.model');

const getUsers = async (req, res) => {
  const users = await userService.getAll();
  return !users ? res.sendStatus(404) : res.json(users.map(User.sendResponse));
};

const getUser = async (req, res) => {
  const user = await userService.get(req.params.userId);
  return !user ? res.sendStatus(404) : res.json(User.sendResponse(user));
};

const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.json(User.sendResponse(user));
};

const updateUser = async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  return !user ? res.sendStatus(400) : res.json(User.sendResponse(user));
};

const deleteUser = async (req, res) => {
  const user = await userService.delete(req.params.userId);
  return !user ? res.sendStatus(404) : res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
