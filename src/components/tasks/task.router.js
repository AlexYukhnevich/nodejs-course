const taskRouter = require('express').Router({ mergeParams: true });
const { validateTask } = require('../../middlewares/validation.middleware');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('./task.controllers');

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
