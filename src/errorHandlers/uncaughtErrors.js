// const logger = require('../loggers/logger');
// const { exit } = process;

const uncaughtErrors = (message, type) => console.error({ type, message });
// logger.error({ type, message });
// logger.on('finish', () => exit(1));
// };

module.exports = uncaughtErrors;
