const { Transform } = require('stream');
const { encode, decode } = require('./data_encryption');
const { ENCRYPTION_ACTIONS } = require('../config');

function encryptChunk(chunk, encrypt, shift) {
  return chunk
    .toString()
    .split('')
    .reduce((acc, cur) => (acc += encrypt(cur, +shift)), '');
}

function transformStream(action, shift) {
  const encryptionAction =
    action === ENCRYPTION_ACTIONS.ENCODE ? encode : decode;
  const transform = (chunk, encoding, callback) => {
    const encryptedChunk = encryptChunk(chunk, encryptionAction, shift);
    callback(null, encryptedChunk);
  };
  return new Transform({ transform });
}

module.exports = transformStream;
