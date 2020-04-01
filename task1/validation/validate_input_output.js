/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable no-bitwise */
const fs = require('fs');
const path = require('path');
const throwErrorMessage = require('./throw_error_message');
const { ERRORS } = require('../config');

const validateOutput = async output => {
  try {
    if (!output) {
      return;
    }
    await fs.promises.access(
      path.join(__dirname, '../', output),
      fs.constants.F_OK | fs.constants.W_OK
    );
  } catch {
    throwErrorMessage(ERRORS.OUTPUT);
  }
};

const validateInput = async input => {
  try {
    if (!input) {
      return;
    }
    await fs.promises.access(
      path.join(__dirname, '../', input),
      fs.constants.F_OK | fs.constants.R_OK
    );
  } catch {
    throwErrorMessage(ERRORS.INPUT);
  }
};

module.exports = { validateOutput, validateInput };
