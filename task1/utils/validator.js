const fs = require('fs');
const path = require('path');
const { ENCRYPTION, ERRORS, ALPHABET } = require('../config');
const readStdin = require('./read_stdin');

const checkPath = filepath =>
  fs.promises.access(path.join(__dirname, '../', filepath));

const validateCommandLine = async options => {
  const { shift, action, input, output } = options;

  if (!Object.values(ENCRYPTION).includes(action)) {
    process.exitCode = 1;
    throw new Error(ERRORS.ACTION);
  }

  if (isNaN(+shift) || shift > ALPHABET.LENGTH || shift < 0) {
    process.exitCode = 1;
    throw new Error(ERRORS.SHIFT);
  }

  if (input) {
    await checkPath(input).catch(err => {
      process.exitCode = 1;
      throw new Error(err);
    });
  }

  if (!input) {
    await readStdin(options).catch(err => {
      process.exitCode = 1;
      throw new Error(err);
    });
  }

  if (!output) {
    await readStdin(options).catch(err => {
      process.exitCode = 1;
      throw new Error(err);
    });
  }
  const params = { action, shift, input, output };
  return params;
};

module.exports = validateCommandLine;
