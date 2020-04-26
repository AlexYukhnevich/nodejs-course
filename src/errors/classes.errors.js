class ClientError extends Error {
  constructor(status, getStatusText) {
    super();
    this.status = status;
    this.message = getStatusText(status);
  }
}

class ServerError extends Error {
  constructor(status, getStatusText) {
    super();
    this.status = status;
    this.message = getStatusText(status);
  }
}

module.exports = { ClientError, ServerError };
