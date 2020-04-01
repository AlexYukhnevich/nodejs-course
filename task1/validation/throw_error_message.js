const throwErrorMessage = message => {
  const exit = process.exit;
  process.stderr.write(message);
  exit(1);
};

module.exports = throwErrorMessage;
