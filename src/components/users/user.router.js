const userRouter = require('express').Router();
const { validateUser } = require('../../middlewares/validation.middleware');
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('./user.controllers');

userRouter
  .route('/')
  .get(getUsers)
  .post(validateUser, createUser);

userRouter
  .route('/:userId')
  .get(getUser)
  .put(validateUser, updateUser)
  .delete(deleteUser);

module.exports = userRouter;
