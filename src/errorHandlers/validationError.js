class ValidationError extends Error {
  constructor(status, getStatusText) {
    super();
    this.status = status;
    this.text = getStatusText(status);
  }
}

module.exports = ValidationError;
