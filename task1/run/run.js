const { promisify } = require('util');
const { readStream, writeStream } = require('../utils/streams');
const transformStream = require('../utils/transform_stream');
const pipeline = promisify(require('stream').pipeline);

const run = async params => {
  return pipeline(
    readStream(params.input),
    transformStream(params.action, params.shift),
    writeStream(params.output)
  );
};

module.exports = run;
