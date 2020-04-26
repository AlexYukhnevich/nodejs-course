const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');
const catchError = require('../../middlewares/catch-error.middleware');

const getTasks = catchError(async (req, res, next) => {
  const tasks = await taskService.getAll(req.params.boardId);
  return !tasks
    ? next(NOT_FOUND)
    : res.status(OK).send(tasks.map(Task.sendResponse));
});

const getTask = catchError(async (req, res, next) => {
  const task = await taskService.get(req.params.taskId);
  return !task ? next(NOT_FOUND) : res.status(OK).send(Task.sendResponse(task));
});

// eslint-disable-next-line no-unused-vars
const createTask = catchError(async (req, res, next) => {
  const task = await taskService.create(req.params.boardId, req.body);
  res.status(OK).send(Task.sendResponse(task));
});

// eslint-disable-next-line no-unused-vars
const updateTask = catchError(async (req, res, next) => {
  const task = await taskService.update(req.params.taskId, req.body);
  res.status(OK).send(Task.sendResponse(task));
});

const deleteTask = catchError(async (req, res, next) => {
  const task = await taskService.delete(req.params.taskId);
  return !task
    ? next(NOT_FOUND)
    : res.status(NO_CONTENT).send('Task has been successfully deleted');
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
