const taskService = require('./task.service');
const Task = require('./task.model');

const getTasks = async (req, res) => {
  const tasks = await taskService.getAll();
  console.log(req.params);
  res.json(tasks.map(Task.sendResponse));
};

const getTask = async (req, res) => {
  const task = await taskService.getTask(req.params.taskId);
  console.log(task);
  return task
    ? res.json(Task.sendResponse(task))
    : res.status(404).send('Task not found');
};

const createTask = async (req, res) => {
  const { title, order, description, columnId, userId } = req.body;
  const { boardId } = req.params;
  const tasks = await taskService.getAll();
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  const task = tasks.find(t => t.id === newTask.id);
  if (!task) {
    await taskService.createTask(tasks, newTask);
    return res.json({
      message: 'Task was added',
      body: Task.sendResponse(newTask)
    });
  }
  res.status(404).send({ message: 'Error! Task already exists' });
};

// Need to finish this implementation
const updateTask = async (req, res) => {
  const { title, order, description, userId, boardId, columnId } = req.body;
  const tasks = await taskService.getAll();
  const task = await taskService.getTask(req.params.taskId);
  if (task) {
    const updateTaskData = {
      id: req.params.taskId,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    };
    await taskService.updateTask(tasks, updateTaskData);
    return res.json({
      message: 'Task was updated',
      body: Task.sendResponse(updateTaskData)
    });
  }
  return res.status(404).send('Task not found');
};

const deleteTask = async (req, res) => {
  const tasks = await taskService.getAll();
  const task = await taskService.getTask(req.params.taskId);
  console.log(req.params);
  if (task) {
    await taskService.deleteTask(tasks, req.params.taskId);
    return res.json({
      message: 'Task was deleted',
      body: Task.sendResponse(task)
    });
  }
  res.status(404).send('Task not found');
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
