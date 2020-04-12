const taskService = require('./task.service');
const Task = require('./task.model');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

const getTasks = async (req, res, next) => {
  const tasks = await taskService.getAll();
  return !tasks
    ? next(NOT_FOUND)
    : res.status(OK).json(tasks.map(Task.sendResponse));
};

const getTask = async (req, res, next) => {
  const task = await taskService.get(req.params.taskId);
  return !task ? next(NOT_FOUND) : res.status(OK).json(Task.sendResponse(task));
};

const createTask = async (req, res) => {
  const task = await taskService.create(req.params.boardId, req.body);
  res.status(OK).json(Task.sendResponse(task));
};

const updateTask = async (req, res) => {
  const task = await taskService.update(req.params.taskId, req.body);
  res.status(OK).json(Task.sendResponse(task));
};

const deleteTask = async (req, res, next) => {
  const task = await taskService.delete(req.params.taskId);
  return !task ? next(NOT_FOUND) : res.status(NO_CONTENT);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
