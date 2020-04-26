const User = require('../components/users/user.model');
const { connect, connection } = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { getHashedEntity } = require('../helpers/bcrypt.helper');

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
    // await db.dropDatabase();
    const hashedPassword = await getHashedEntity('admin', 10);
    const user = new User({
      name: 'admin',
      login: 'admin',
      password: hashedPassword
    });
    user.save();
    callback();
  });
};

module.exports = connectToDB;
