const { ALPHABET } = require('../config');

const encode = (char, shift) => {
  const symbolExists = ALPHABET.VALUE.indexOf(char.toLowerCase());
  const shiftPosition = symbolExists + shift;
  const newCharPosition =
    shiftPosition < 0
      ? (ALPHABET.LENGTH - (symbolExists + shift)) % ALPHABET.LENGTH
      : (symbolExists + shift) % ALPHABET.LENGTH;
  let updateChar;

  if (symbolExists === -1) {
    updateChar = char;
  } else if (char === char.toLowerCase()) {
    updateChar = ALPHABET.VALUE[newCharPosition].toLowerCase();
  } else if (char === char.toUpperCase()) {
    updateChar = ALPHABET.VALUE[newCharPosition].toUpperCase();
  }

  return updateChar;
};

const decode = (char, shift) => encode(char, -shift);

module.exports = { encode, decode };
