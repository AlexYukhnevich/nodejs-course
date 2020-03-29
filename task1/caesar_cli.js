const { program } = require('commander');
const stream = require('stream');
const { promisify } = require('util');
const { readStream, writeStream } = require('./utils/streams');
const transformStream = require('./utils/transform_stream');
const validateCommandLine = require('./utils/validator');
const pipeline = promisify(stream.pipeline);

program
  .requiredOption('-s, --shift <num>', 'shift sign')
  .requiredOption('-a, --action [type]', 'action encode or decode')
  .option('-i, --input <filename>', 'input data')
  .option('-o, --output <filename>', 'output data');

program.parse(process.argv);
const { shift, action, input, output } = program;

async function start(params) {
  const options = await validateCommandLine(params);
  pipeline(
    readStream(options.input),
    transformStream(options.action, options.shift),
    writeStream(options.output)
  );
}

start({ shift, action, input, output })
  .then(() => console.log('Success'))
  .catch(console.error);
