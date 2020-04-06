const fs = require('fs').promises;
const path = require('path');
const databasePath = path.join(__dirname, 'tasks.database.json');
const Task = require('./task.model');

class TaskRepository {
  static async getTasks() {
    const db = await fs.readFile(databasePath, 'utf-8');
    return db ? JSON.parse(db).tasks : [];
  }

  static async get(id) {
    const db = await fs.readFile(databasePath, 'utf-8');
    const tasks = db ? JSON.parse(db).tasks : [];
    return Array.isArray(tasks) ? tasks.find(t => t.id === id) : 'undefined';
  }

  static async create(data) {
    const task = new Task(data);
    const tasks = await this.getTasks();
    const updateTasks = Array.isArray(tasks) ? tasks.concat(task) : task;
    const updateDB = { tasks: updateTasks };
    await fs.writeFile(databasePath, JSON.stringify(updateDB));
    return task;
  }

  static async update(id, data) {
    let task = await this.get(id);
    const tasks = await this.getTasks();
    if (task) {
      task = { id, ...data };
      const updateDB = { task: tasks.map(t => (t.id === task.id ? task : t)) };
      await fs.writeFile(databasePath, JSON.stringify(updateDB));
    }
    return task;
  }

  static async delete(id) {
    const task = await this.get(id);
    const tasks = await this.getTasks();
    if (task) {
      const updateDB = { task: tasks.filter(t => t.id !== task.id) };
      await fs.writeFile(databasePath, JSON.stringify(updateDB));
    }
    return task;
  }

  static async unassignUser(userId) {
    const tasks = await this.getTasks();
    const userTasks = Array.isArray(tasks)
      ? tasks.filter(t => t && t.userId === userId)
      : undefined;
    if (userTasks) {
      userTasks.forEach(task => (task.userId = null));
    }
    return userTasks;
  }
}

module.exports = TaskRepository;
