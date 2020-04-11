const { PORT } = require('./common/config');
const app = require('./app');
const uncaughtErrors = require('./errorHandlers/uncaughtErrors');

process.on('uncaughtException', err =>
  uncaughtErrors(err, 'uncaughtException')
);
process.on('unhandledRejection', err =>
  uncaughtErrors(err, 'unhandledRejection')
);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
