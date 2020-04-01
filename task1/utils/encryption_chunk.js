const { encode, decode } = require('./data_encryption');
const { ENCRYPTION } = require('../config');

const encryptChunk = (chunk, action, shift) => {
  const encrypt = action === ENCRYPTION.ENCODE ? encode : decode;
  return chunk
    .toString()
    .split('')
    .reduce((acc, char) => (acc += encrypt(char, +shift)), '');
};

module.exports = encryptChunk;
