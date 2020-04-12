const uncaughtErrors = require('./errorHandlers/uncaughtErrors.js');
const { PORT } = require('./common/config');
const app = require('./app');

process.on('uncaughtException', err =>
  uncaughtErrors(err.message, 'uncaughtException')
);
process.on('unhandledRejection', err => {
  uncaughtErrors(err.message, 'unhandledRejection');
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
