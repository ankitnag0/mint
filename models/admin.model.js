const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the admin to the database
adminSchema.pre('save', async function () {
  const adminSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, adminSalt);
});

// Compare the provided password with the hashed password
adminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Admin', adminSchema);