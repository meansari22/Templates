const { StatusCodes } = require("http-status-codes");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
