const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');

exports.authenticate = (req, res, next) => {
  // Get the JWT from the request headers
  const token = req.headers['authorization'].split(' ')[1];
  // If there is no JWT, return an error
  if (!token) {
    throw new CustomError('Access denied. No token provided.', 401);
  }
  // If there is a JWT, verify it using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

// Authentication middleware for admins
exports.authenticateAdmin = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    throw new CustomError('Access denied. No token provided', 401);
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user has the admin role
    if (req.user.role !== 'admin') {
      throw new CustomError('You are not authorized to access this route', 403);
    }

    next();
  } catch (error) {
    throw new CustomError('Invalid token', 400);
  }
};
