const taskRouter = require('express').Router({ mergeParams: true });
const { validateTask } = require('../../errorHandlers/middlewares/validation');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('./controllers');

taskRouter
  .route('/')
  .get(getTasks)
  .post(validateTask, createTask);

taskRouter
  .route('/:taskId')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
