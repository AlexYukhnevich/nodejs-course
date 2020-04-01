const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const encryptChunk = require('./encryption_chunk');
const { COMMAND_LINE_TEXT } = require('../config');

const readStream = input => {
  if (input) {
    return fs.createReadStream(path.join(__dirname, '../', input));
  }
  process.stdout.write(`${COMMAND_LINE_TEXT}\n`);
  return process.stdin;
};

const writeStream = output => {
  if (output) {
    return fs.createWriteStream(path.join(__dirname, '../', output), {
      flags: 'a'
    });
  }
  return process.stdout;
};

const transformStream = (action, shift) => {
  const transform = (chunk, encoding, callback) => {
    const encryptedChunk = encryptChunk(chunk, action, shift);
    callback(null, `${encryptedChunk}\n`);
  };
  return new Transform({ transform });
};

module.exports = {
  readStream,
  writeStream,
  transformStream
};
