const fs = require('fs').promises;
const path = require('path');
const databasePath = path.join(__dirname, 'tasks.database.json');
const Task = require('./task.model');

class TaskRepository {
  static async getAll() {
    const db = await fs.readFile(databasePath, 'utf-8');
    return db ? JSON.parse(db) : db;
  }

  static async get(id) {
    const db = await fs.readFile(databasePath, 'utf-8');
    const tasks = JSON.parse(db);
    return Array.isArray(tasks) ? tasks.find(t => t.id === id) : tasks;
  }

  static async create(boardId, data) {
    const task = new Task({ ...data, boardId });
    const tasks = await this.getAll();
    const db = Array.isArray(tasks) ? [...tasks, task] : [task];
    await fs.writeFile(databasePath, JSON.stringify(db));
    return task;
  }

  static async update(id, data) {
    let task = await this.get(id);
    const tasks = await this.getAll();
    if (task) {
      task = { id, ...data };
      const db = Array.isArray(tasks)
        ? tasks.map(t => (t.id === task.id ? task : t))
        : tasks;
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return task;
  }

  static async delete(id) {
    const task = await this.get(id);
    if (task) {
      const tasks = await this.getAll();
      const db = Array.isArray(tasks)
        ? tasks.filter(t => t.id !== task.id)
        : [task];
      await fs.writeFile(databasePath, JSON.stringify(db));
    }
    return task;
  }

  static async unassignUser(userId) {
    const tasks = await this.getAll();
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
