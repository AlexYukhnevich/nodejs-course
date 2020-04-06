const taskRouter = require('express').Router({ mergeParams: true });
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
  .post(createTask);

taskRouter
  .route('/:taskId')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
