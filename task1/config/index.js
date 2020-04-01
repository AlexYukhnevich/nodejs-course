const ENCRYPTION = {
  ENCODE: 'encode',
  DECODE: 'decode'
};

const ALPHABET = {
  VALUE: 'abcdefghijklmnopqrstuvwxyz',
  get LENGTH() {
    return this.VALUE.length;
  }
};

const ERRORS = {
  INPUT: "There is no such file or it's not readable.",
  OUTPUT: "There is no such file or it's not writable.",
  ACTION: 'Invalid action. Use "encode" or "decode" option.',
  SHIFT: 'Invalid shift. Use integer.',
  SHIFT_INVALID_RANGE: `Shift must be more than 0 and less than ${ALPHABET.LENGTH}`
};

const COMMAND_LINE_TEXT = 'Enter the text';

module.exports = { ENCRYPTION, ALPHABET, ERRORS, COMMAND_LINE_TEXT };
