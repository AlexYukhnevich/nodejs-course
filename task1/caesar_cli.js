/* eslint-disable node/no-unsupported-features/node-builtins */
const { program } = require('commander');
const stream = require('stream');
const { promisify } = require('util');
const { readStream, writeStream, transformStream } = require('./utils/streams');
const validateCommandLine = require('./validation/validator');
const pipeline = promisify(stream.pipeline);

(async () => {
  program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .option('-s, --shift <num>', 'shift sign')
    .option('-a, --action [type]', 'action encode or decode')
    .option('-i, --input <filename>', 'input data')
    .option('-o, --output <filename>', 'output data')
    .parse(process.argv);
  const { input, output, action, shift } = await validateCommandLine(
    program.opts()
  );

  pipeline(
    readStream(input),
    transformStream(action, shift),
    writeStream(output)
  )
    .then(() => process.stdout.write('Success'))
    .catch(process.stderr.write);
})();
