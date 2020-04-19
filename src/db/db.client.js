const User = require('../components/users/user.model');
const Board = require('../components/boards/board.model');
const Task = require('../components/tasks/task.model');
const mongoose = require('mongoose');
// const { Schema } = mongoose;
// console.log(Board);
const users = [
  new User({ name: 'Alexei', login: 'Alik', password: 'admin' }),
  new User({ name: 'Boris', login: 'Bob', password: 'zamestitel' })
];

const boards = [new Board({ title: 'First' }), new Board({ title: 'Second' })];

const tasks = [
  new Task({ title: 'Bugfix', order: 0, description: 'bugfix' }),
  new Task({ title: 'Epic', order: 1, description: 'create epic' }),
  new Task({ title: 'Story', order: 2, description: 'create feature' })
];
// console.log(board);

const connectToDB = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', err => console.error('connection error', err));
  db.once('open', async () => {
    console.log('Connected');
    await db.dropDatabase();
    // User.insertMany([
    //   { name: 'Alexei', login: 'Alik', password: 'admin' },
    //   { name: 'Boris', login: 'Bob', password: 'zamestitel' }
    // ]);
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());

    callback();
  });
};

module.exports = { connectToDB };
