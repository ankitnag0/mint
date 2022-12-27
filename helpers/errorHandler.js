const mongoose = require('mongoose');

const CustomError = require('./CustomError');

// Error handler middleware
exports.errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Invalid input',
      errors: error.errors
    });
  } else if (error.code === 11000) { // error instanceof mongoose.Error.MongoError && 
    res.status(400).json({
      message: 'Duplicate email or phone number'
    });
  } else if (error instanceof CustomError) {
    res.status(error.status).json({
      message: error.message
    });
  } else {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};