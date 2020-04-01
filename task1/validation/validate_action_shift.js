const { ALPHABET, ERRORS, ENCRYPTION } = require('../config');
const throwErrorMessage = require('./throw_error_message');

const validateShift = shift => {
  if (isNaN(shift)) {
    throwErrorMessage(ERRORS.SHIFT);
  } else if (shift < 0 || shift > ALPHABET.LENGTH) {
    throwErrorMessage(ERRORS.SHIFT_INVALID_RANGE);
  }
};

const validateAction = action =>
  !Object.values(ENCRYPTION).includes(action)
    ? throwErrorMessage(ERRORS.ACTION)
    : action;

module.exports = { validateAction, validateShift };
