const mongoose = require('mongoose');

const connectToDB = callback => {
  mongoose.connect(
    'mongodb+srv://Admin:Admin@cluster-11tom.mongodb.net/rest?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const db = mongoose.connection;
  db.on('error', err => console.error('connection error', err));
  db.once('open', () => {
    console.log('Connected');
    callback();
  });
};

module.exports = { connectToDB };
