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

const OPERATIONS = {
  '--input': '-i',
  '--action': '-a',
  '--shift': '-s',
  '--output': '-o'
};

const TEMPLATE_TEXT = 'This is secret. Message about "_" symbol!';

const FILES = {
  PRESS_INPUT: 'Enter an input file name',
  PRESS_OUTPUT: 'Enter an output file name'
};

const ERRORS = {
  INPUT: "There is no such file or it's not readable.",
  OUTPUT: "There is no such file or it's not writable.",
  ACTION: 'Invalid action. Use "encode" or "decode" instead.',
  SHIFT: `Invalid shift. Shift must be an integer and has value less than ${ALPHABET.LENGTH} and more than 0.`,
  MISSED_OPERATION: 'Missed operation',
  MISSED_INPUT: 'Missed input file',
  FILE_NOT_EXIST: 'File not entered or it is not a file at all'
};

module.exports = {
  ENCRYPTION,
  ALPHABET,
  ERRORS,
  OPERATIONS,
  TEMPLATE_TEXT,
  FILES
};
