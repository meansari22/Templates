const { StatusCodes } = require("http-status-codes");

const urlNOtFound = (req, res, next) => {
  const error = new Error("URL NOT FOUND");
  error.status = StatusCodes.NOT_FOUND;
  next(error);
};

module.exports = urlNOtFound;
