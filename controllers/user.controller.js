const User = require('../models/user.model');
const CustomError = require('../helpers/CustomError');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Create a new user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  const newUser = await user.save();
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  res.status(201).json({
    message: 'User created',
    user: newUser,
    token
  });
};

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: 'Users retrieved',
    data: users
  });
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new CustomError('User not found', 404);
  res.status(200).json({
    message: 'User retrieved',
    data: user
  });
};

// Get the logged in user from jwt
exports.getMyDetails = async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) throw new CustomError('User not found', 404);
  res.status(200).json({
    message: 'User retrieved',
    data: user
  });
}

// // Update a user
// exports.updateUser = async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!user) throw new CustomError('User not found', 404);
//   res.status(200).json({
//     message: 'User updated',
//     data: user
//   });
// };

// Update a user
exports.updateUser = async (req, res) => {
  // Create a new object with only the fields that the user is allowed to update
  const allowedUpdates = ['bankDetails', 'address'];
  const updates = _.pick(req.body, allowedUpdates);

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  if (!user) throw new CustomError('User not found', 404);
  res.status(200).json({
    message: 'User updated',
    data: user
  });
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new CustomError('User not found', 404);
  res.status(204).json({
    message: 'User deleted'
  });
};

// User login
exports.loginUser = async (req, res) => {
  // Find the user in the database by email
  const user = await User.findOne({ email: req.body.email });
  // If the user doesn't exist, throw an error
  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }
  // Compare the provided password with the hashed password stored in the database
  const isMatch = await user.comparePassword(req.body.password);

  // If the passwords don't match, throw an error
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }

  // Create a JWT for the authenticated user
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  // Send the JWT to the client
  res.status(200).json({
    message: 'Token generated',
    token: token,
    user
  });
}

exports.getUserBalance = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({
    message: 'Balance retrieved',
    data: user.balance
  })
}