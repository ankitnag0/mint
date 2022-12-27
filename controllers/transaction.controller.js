const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

const CustomError = require('../helpers/CustomError');

exports.deposit = async (req, res) => {
  // Find the user
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // Create a new transaction
  const transaction = new Transaction({
    amount: req.body.amount,
    type: 'deposit',
    user: user._id
  });
  await transaction.save();

  res.status(201).json({
    message: 'Deposit request created',
    data: transaction
  });
};

exports.withdraw = async (req, res) => {
  // Find the user
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // Check if the user has sufficient balance
  if (user.balance < req.body.amount) {
    throw new CustomError('Insufficient balance', 400);
  }

  // Create a new transaction
  const transaction = new Transaction({
    amount: req.body.amount,
    type: 'withdraw',
    user: user._id
  });
  await transaction.save();

  res.status(201).json({
    message: 'Withdraw request created',
    data: transaction
  });
};

exports.approve = async (req, res) => {
  // Find the transaction
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    throw new CustomError('Transaction not found', 404);
  }

  // Check if the transaction is already approved
  if (transaction.status !== 'pending') {
    throw new CustomError('Transaction has already been approved', 400);
  }

  // Find the user
  const user = await User.findById(transaction.user);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  let balance;

  // Update the transaction status and user balance
  if (transaction.type === 'deposit') {
    transaction.status = 'success';
    balance = user.balance + transaction.amount;

  } else if (transaction.type === 'withdraw') {
    if (user.balance < transaction.amount) {
      transaction.status = 'failed';
    } else {
      transaction.status = 'success';
      balance = user.balance - transaction.amount;
    }
  }

  // Save the updated transaction and user
  await transaction.save();
  console.log(user);
  // await user.save();
  const updatedUser = await User.findByIdAndUpdate(transaction.user, {balance}, {new: true});
  console.log(updatedUser);

  res.status(200).json({
    message: 'Transaction approved',
    data: transaction
  });
};

exports.reject = async (req, res) => {
  // Find the transaction
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    throw new CustomError('Transaction not found', 404);
  }

  // Check if the transaction is already approved or rejected
  if (transaction.status !== 'pending') {
    throw new CustomError('Transaction has already been approved or rejected', 400);
  }

  // Update the transaction status
  transaction.status = 'failed';

  // Save the updated transaction
  await transaction.save();

  res.status(200).json({
    message: 'Transaction rejected',
    data: transaction
  });
};


exports.getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).json({
    message: 'All transactions retrieved',
    data: transactions
  });
};

exports.getTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    throw new CustomError('Transaction not found', 404);
  }
  res.status(200).json({
    message: 'Transaction retrieved',
    data: transaction
  });
};

exports.getTransactionsByStatus = async (req, res) => {
  const transactions = await Transaction.find({ status: req.params.status });
  res.status(200).json({
    message: `Transactions with status ${req.params.status} retrieved`,
    data: transactions
  });
};

exports.getUserTransactions = async (req, res) => {
  // Find the transactions of the logged in user
  const transactions = await Transaction.find({ user: req.user._id });
  res.status(200).json({
    message: 'User transactions retrieved',
    data: transactions
  });
};

