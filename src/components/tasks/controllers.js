const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');

const getTasks = async (req, res, next) => {
  const tasks = await taskService.getAll();
  if (!tasks) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = tasks.map(Task.sendResponse);
  }
  next();
};

const getTask = async (req, res, next) => {
  const task = await taskService.get(req.params.taskId);
  if (!task) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = Task.sendResponse(task);
  }
  next();
};

const createTask = async (req, res, next) => {
  const task = await taskService.create(req.params.boardId, req.body);
  res.info = OK;
  res.payload = Task.sendResponse(task);
  next();
};

const updateTask = async (req, res, next) => {
  const task = await taskService.update(req.params.taskId, req.body);
  res.info = OK;
  res.payload = Task.sendResponse(task);
  next();
};

const deleteTask = async (req, res, next) => {
  const task = await taskService.delete(req.params.taskId);
  if (!task) {
    res.info = NOT_FOUND;
  } else {
    res.info = NO_CONTENT;
    res.payload = { message: 'Task has been successfully deleted' };
  }
  next();
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
