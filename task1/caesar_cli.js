const { program } = require('commander');
const run = require('./run/run');
const validateCommandLine = require('./utils/validator');

program
  .requiredOption('-s, --shift <num>', 'shift sign')
  .requiredOption('-a, --action [type]', 'action encode or decode')
  .option('-i, --input <filename>', 'input data')
  .option('-o, --output <filename>', 'output data');

program.parse(process.argv);
const { shift, action, input, output } = program;

(async () => {
  const options = await validateCommandLine({ shift, action, input, output });
  if (options) {
    run(options)
      .then(() => console.log('Success'))
      .catch(console.error);
  }
})();
