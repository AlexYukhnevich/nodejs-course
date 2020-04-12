const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const appRouter = require('./routes/appRoutes');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const loggerMiddleware = require('./loggers/logger.middleware.js');
const errorHandler = require('./errorHandlers/middlewares/errorHandler');
const uncaughtErrors = require('./errorHandlers/uncaughtErrors.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(
  '/',
  (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  },
  appRouter
);
app.use('*', errorHandler, loggerMiddleware);

process.on('uncaughtException', err =>
  uncaughtErrors(err, 'uncaughtException')
);
process.on('unhandledRejection', err =>
  uncaughtErrors(err, 'unhandledRejection')
);

module.exports = app;
