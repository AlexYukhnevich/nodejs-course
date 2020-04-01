const { validateAction, validateShift } = require('./validate_action_shift');
const { validateInput, validateOutput } = require('./validate_input_output');

async function validateCommandLine({ shift, action, input, output }) {
  validateAction(action);
  validateShift(+shift);
  await validateInput(input);
  await validateOutput(output);
  return { action, shift, input, output };
}

module.exports = validateCommandLine;
