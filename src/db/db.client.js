const User = require('../components/users/user.model');
const Board = require('../components/boards/board.model');
const Task = require('../components/tasks/task.model');
const { connect, connection } = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const users = [new User({ name: 'Aliaksei', login: 'Al', password: 'admin' })];

const boards = [new Board({ title: 'Major' }), new Board({ title: 'Minor' })];

const tasks = [
  new Task({ title: 'Bugfix', order: 0, description: 'bugfix' }),
  new Task({ title: 'Epic', order: 1, description: 'create epic' }),
  new Task({ title: 'Story', order: 2, description: 'create feature' })
];

const connectToDB = callback => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = connection;
  db.on('error', err => console.error('connection error', err));
  db.once('open', async () => {
    console.log('Connected');
    await db.dropDatabase();

    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());

    callback();
  });
};

module.exports = connectToDB;
