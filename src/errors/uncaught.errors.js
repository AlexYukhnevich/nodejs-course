const uncaughtErrors = (message, type) => console.error({ type, message });
module.exports = uncaughtErrors;
