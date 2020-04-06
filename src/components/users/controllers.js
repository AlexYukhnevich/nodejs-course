const userService = require('./user.service');
const User = require('./user.model');

const validateBody = (req, res, next) => {
  const { name, login, password } = req.body;
  if (!name || !login || !password) {
    console.error('Invalid request body');
    return res.sendStatus(400);
  }
  next();
};

const getUsers = async (req, res) => {
  const users = await userService.getAll();
  return res.json(users.map(User.sendResponse));
};

const getUser = async (req, res) => {
  const user = await userService.get(req.params.userId);
  return user === undefined
    ? res.sendStatus(404)
    : res.json(User.sendResponse(user));
};

const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.json(User.sendResponse(user));
};

const updateUser = async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  return user === undefined
    ? res.sendStatus(400)
    : res.json(User.sendResponse(user));
};

const deleteUser = async (req, res) => {
  const user = await userService.delete(req.params.userId);
  return user === undefined ? res.sendStatus(404) : res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  validateBody
};
