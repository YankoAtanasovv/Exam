const { MongooseError, Error } = require("mongoose");

exports.getErrorMessage = (error) => {
  if (error instanceof MongooseError || error instanceof Error) {
    return Object.values(error.errors).map((err) => err.message);
  } else if (error) {
    return [error.message];
  }
};
