const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bankDetails: {
    bankAccountNumber: {
      type: String,
      match: /^[0-9]{9,18}$/
    },
    ifscCode: {
      type: String,
      match: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/
    },
    panCard: {
      type: String,
      match: /^[A-Z]{5}\d{4}[A-Z]{1}$/
    }
  },
  address: {
    type: String
  },
	balance: {
    type: Number,
    default: 0
  },
	investments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
	tansactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

userSchema.pre('save', async function () {
  const userSalt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, userSalt)
})

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch

}

const User = mongoose.model('User', userSchema);

module.exports = User;