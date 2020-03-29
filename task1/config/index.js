const ENCRYPTION_ACTIONS = {
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
  ACTION: 'Invalid action. Use "encode" or "decode" instead.',
  SHIFT: 'Invalid shift. Use integer instead.'
};

module.exports = { ENCRYPTION_ACTIONS, ALPHABET, ERRORS };
