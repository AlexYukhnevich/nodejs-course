// eslint-disable-next-line no-sync
const appendError = require('fs').appendFileSync;
const path = require('path');
const moment = require('moment');
const exit = process.exit;

const exceptionPath = path.resolve(__dirname, '../..', 'logs/exception.log');

const uncaughtErrors = (err, text) => {
  const error = {
    level: text,
    message: err.stack.split('\n'),
    timestamp: moment().format('YYYY-MM-DD hh:mm:ss')
  };
  console.error(error);
  appendError(exceptionPath, `${JSON.stringify(error, null, '\t')}\n`);
  exit(1);
};

module.exports = uncaughtErrors;
