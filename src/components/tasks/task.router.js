const taskRouter = require('express').Router({ mergeParams: true });
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  validateBody
} = require('./controllers');

taskRouter
  .route('/')
  .get(getTasks)
  .post(validateBody, createTask);

taskRouter
  .route('/:taskId')
  .get(getTask)
  .put(validateBody, updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
