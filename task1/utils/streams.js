const fs = require('fs');
const path = require('path');

const readStream = input =>
  input
    ? fs.createReadStream(path.join(__dirname, '../', input))
    : process.stdin;

const writeStream = output =>
  output
    ? fs.createWriteStream(path.join(__dirname, '../', output), { flags: 'a' })
    : process.stdout;

module.exports = {
  readStream,
  writeStream
};
