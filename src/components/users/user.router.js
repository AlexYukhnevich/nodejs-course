const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  validateBody
} = require('./controllers');

userRouter
  .route('/')
  .get(getUsers)
  .post(validateBody, createUser);

userRouter
  .route('/:userId')
  .get(getUser)
  .put(validateBody, updateUser)
  .delete(deleteUser);

module.exports = userRouter;
