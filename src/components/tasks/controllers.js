const taskService = require('./task.service');
const Task = require('./task.model');

const getTasks = async (req, res) => {
  const tasks = await taskService.getAll();
  return !tasks ? res.sendStatus(404) : res.json(tasks.map(Task.sendResponse));
};

const getTask = async (req, res) => {
  const task = await taskService.get(req.params.taskId);
  return !task ? res.sendStatus(404) : res.json(Task.sendResponse(task));
};

const createTask = async (req, res) => {
  const task = await taskService.create(req.params.boardId, req.body);
  return !task ? res.sendStatus(400) : res.json(Task.sendResponse(task));
};

const updateTask = async (req, res) => {
  const task = await taskService.update(req.params.taskId, req.body);
  return !task ? res.sendStatus(400) : res.json(Task.sendResponse(task));
};

const deleteTask = async (req, res) => {
  const task = await taskService.delete(req.params.taskId);
  return !task ? res.sendStatus(404) : res.sendStatus(204);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
