const usersService = require('./user.service');
const User = require('./user.model');

const getUsers = async (req, res) => {
  const users = await usersService.getAll();
  console.log(users);
  return users
    ? res.json(users.map(User.sendResponse))
    : res.status(401).send('Access token is missing or invalid');
  // res.json(users.map(User.sendResponse));
};

const getUser = async (req, res) => {
  console.log(req.params);
  const user = await usersService.getUser(req.params.userId);
  console.log(user);
  return user
    ? res.json(User.sendResponse(user))
    : res.status(404).send('User not found');
};

const createUser = async (req, res) => {
  const users = await usersService.getAll();
  const newUser = new User(req.body);
  const user = users.find(u => u.id === newUser.id);
  if (!user) {
    await usersService.createUser(users, newUser);
    return res.json({
      message: 'User was added',
      body: User.sendResponse(newUser)
    });
  }
  res.status(404).send({ message: 'Error! Such user already exists' });
};

const updateUser = async (req, res) => {
  const { name, login, password } = req.body;
  const users = await usersService.getAll();
  const user = await usersService.getUser(req.params.userId);
  if (user) {
    const updateUserData = { id: user.id, name, login, password };
    await usersService.updateUser(users, updateUserData);
    return res.json({
      message: 'User was updated',
      body: User.sendResponse(updateUserData)
    });
  }
  return res.status(404).send('Such user not found');
};

const deleteUser = async (req, res) => {
  const users = await usersService.getAll();
  const user = await usersService.getUser(req.params.userId);
  if (user) {
    await usersService.deleteUser(users, req.params.userId);
    return res.status(204).send('The user has been deleted');
    // message: 'User was deleted',
    // body: User.sendResponse(user)
  }
  res.status(404).send('Such user not found');
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
