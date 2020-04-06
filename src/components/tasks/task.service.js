/* eslint-disable node/no-unsupported-features/node-builtins */
const fs = require('fs').promises;
const path = require('path');
const tasksDatabasePath = path.join(__dirname, 'tasks.database.json');
console.log(tasksDatabasePath);

class TaskService {
  async getAll() {
    const rawTasks = await fs.readFile(tasksDatabasePath, 'utf-8');
    const tasks = rawTasks ? JSON.parse(rawTasks) : [];
    return tasks;
  }

  async getTask(id) {
    const rawTasks = await fs.readFile(tasksDatabasePath, 'utf-8');
    const task = JSON.parse(rawTasks).find(t => t.id === +id);
    return task;
  }

  async createTask(tasks, newTask) {
    tasks.push(newTask);
    await this.updateTasksDatabase(tasks);
  }

  async updateTask(tasks, data) {
    const updateTasks = tasks.map(t => (t.id === data.id ? data : t));
    await this.updateTasksDatabase(updateTasks);
  }

  async deleteTask(tasks, id) {
    const updateTasks = tasks.filter(t => t.id !== id);
    await this.updateTasksDatabase(updateTasks);
  }

  async updateTasksDatabase(updateDatabase) {
    await fs.writeFile(tasksDatabasePath, JSON.stringify(updateDatabase));
  }
}

const taskService = new TaskService();
module.exports = taskService;
