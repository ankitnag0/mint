const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const CustomError = require('../helpers/CustomError');

// Create admin controller
const createAdmin = async (req, res) => {
  // Create the admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Save the admin to the database
  await admin.save();

  // Generate the token
  const token = jwt.sign({ _id: admin._id, role: 'admin' }, process.env.JWT_SECRET);

  // Send the token and admin details in the response
  res.header('x-auth-token', token).send({
    message: 'Admin created successfully',
    token,
  });
};

// Login controller for admins
const loginAdmin = async (req, res) => {

  // Check if the admin exists
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    throw new CustomError('Invalid email or password', 400);
  }

  // Check if the password is correct
  const isValidPassword = await admin.comparePassword(req.body.password);
  if (!isValidPassword) {
    throw new CustomError('Invalid email or password', 400);
  }

  // Generate the token
  const token = jwt.sign({ _id: admin._id, role: 'admin' }, process.env.JWT_SECRET);

  // Send the token in the response
  res.header('x-auth-token', token).send({
    message: 'You are now logged in',
    token
  });
};

module.exports = {
    createAdmin,
    loginAdmin
}