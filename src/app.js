const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const appRouter = require('./routes/appRoutes');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const initialLoggerMiddleware = require('./middlewares/logger.middleware.js');
const errorHandlerMiddleware = require('./middlewares/error-handler.middleware');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(initialLoggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(appRouter);
app.use('*', errorHandlerMiddleware);

module.exports = app;
