const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const path = require('path');

const errorPath = path.resolve(__dirname, '../..', 'logs/error.log');
const infoPath = path.resolve(__dirname, '../..', 'logs/info.log');

const logger = createLogger({
  format: format.combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: errorPath,
      level: 'error',
      format: combine(format.uncolorize())
    }),
    new transports.File({
      filename: infoPath,
      level: 'info',
      format: combine(format.uncolorize())
    })
  ]
});

module.exports = logger;
