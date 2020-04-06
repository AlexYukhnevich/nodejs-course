const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('./controllers');

userRouter
  .route('/')
  .get(getUsers)
  .post(createUser);

userRouter
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
