const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 100
  },
  type: {
    type: String,
    required: true,
    enum: ['fixed', 'flexible', 'secure']
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  time: {
    type: String,
    default: new Date().toLocaleTimeString()
  },
  profitGenerated: {
    type: Number,
    default: 0
  },
	closingDate: {
    type: Date,
    default: null
  },
  closingTime: {
    type: String,
    default: null
  },
  daysCounter: {
    type: Number,
    default: 0
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;