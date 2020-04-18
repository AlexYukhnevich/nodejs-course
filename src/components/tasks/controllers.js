const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    return !tasks
      ? next(NOT_FOUND)
      : res.status(OK).send(tasks.map(Task.sendResponse));
  } catch (err) {
    return next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.get(req.params.taskId);
    return !task
      ? next(NOT_FOUND)
      : res.status(OK).send(Task.sendResponse(task));
  } catch (err) {
    return next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.create(req.params.boardId, req.body);
    res.status(OK).send(Task.sendResponse(task));
  } catch (err) {
    return next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.update(req.params.taskId, req.body);
    res.status(OK).send(Task.sendResponse(task));
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.delete(req.params.taskId);
    return !task
      ? next(NOT_FOUND)
      : res.status(NO_CONTENT).send('Task has been successfully deleted');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
