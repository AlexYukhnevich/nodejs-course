const fs = require('fs');
const path = require('path');
const { ERRORS, OPERATIONS, TEMPLATE_TEXT, FILES } = require('../config');
const run = require('../run/run');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const readStdin = async options => {
  process.stdout.write(`${FILES.PRESS_INPUT}\n`);
  const { shift, action } = options;
  return new Promise((resolve, reject) => {
    const operations = [];
    const filePaths = [];
    process.stdin.on('data', async data => {
      const [operation, filepath] = data
        .toString()
        .trim()
        .split(' ');

      const operationExists = Object.entries(OPERATIONS)
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter(item => item.includes(operation));

      operations.push(...operationExists);
      filePaths.push(filepath);
      console.log(filePaths);
      if (!operationExists) {
        reject(ERRORS.MISSED_OPERATION);
      } else if (!filepath || !path.extname(filepath)) {
        reject(ERRORS.FILE_NOT_EXIST);
      } else if (operations.includes('--input') || operations.includes('--i')) {
        if (!operations.includes('--output') || !operations.includes('-o')) {
          await writeFile(path.join(__dirname, '../', filepath), TEMPLATE_TEXT);
          process.stdout.write(`${FILES.PRESS_OUTPUT}\n`);
        }
      } else if (
        operations.includes('--output') ||
        operations.includes('--o')
      ) {
        if (!operations.includes('--input') || !operations.includes('-i')) {
          reject(ERRORS.MISSED_INPUT);
        }
        const [inputPath, outputPath] = filePaths;
        run({ shift, action, input: inputPath, output: outputPath })
          .then(() => {
            console.log('Success');
            process.exitCode = 1;
          })
          .catch(console.error);
      }
    });
    process.stdin.on('error', err => reject(err));
  });
};

module.exports = readStdin;
