const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: error.message,
      // stack:error.stack
    },
  });
};

module.exports = errorHandler;
