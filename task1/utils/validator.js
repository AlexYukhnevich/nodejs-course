const fs = require('fs');
const { ERRORS } = require('../config');

const checkPath = path => fs.promises.access(path);

const validateCommandLine = async options => {
  const { shift, action, input, output } = options;

  if (input) {
    try {
      await checkPath(input);
    } catch {
      process.exitCode = 1;
      throw new Error(ERRORS.INPUT);
    }
  }

  if (output) {
    try {
      await checkPath(output);
    } catch {
      process.exitCode = 1;
      throw new Error(ERRORS.OUTPUT);
    }
  }
  const params = { action, shift, input, output };
  return params;
};

module.exports = validateCommandLine;
