const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['deposit', 'withdraw']
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    default: new Date().toLocaleTimeString()
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'success', 'failed']
  },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;