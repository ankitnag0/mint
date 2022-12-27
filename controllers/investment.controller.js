const Investment = require('../models/investmet.model');
const User = require('../models/user.model');
const CustomError = require('../helpers/CustomError');

exports.makeInvestment = async (req, res) => {
  const investment = new Investment(req.body);
  investment.user = req.user._id;

  // Check that the user has enough balance
  const user = await User.findById(req.user._id);
  if (user.balance < investment.amount) {
    throw new CustomError('Insufficient balance', 400);
  }

  // Update the user's balance and save the investment
  let balance = user.balance - investment.amount;
  // await user.save();
  const updatedUser = await User.findByIdAndUpdate(investment.user, {balance}, {new:true});
  await investment.save();

  res.status(201).json({
    message: 'Investment made',
    data: investment
  });
};

exports.closeInvestment = async (req, res) => {
  // Find the investment
  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    throw new CustomError('Investment not found', 404);
  }

  // Update the closing date and time
  investment.closingDate = new Date();
  investment.closingTime = new Date().toLocaleTimeString();

  // Find the user
  const user = await User.findById(investment.user);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // Calculate the total profit using a ternary operator
  const totalProfit = (investment.type === 'fixed' || investment.type === 'secure') ? 0 : investment.profitGenerated;

  // Add the investment amount and total profit to the user's balance
  let balance = user.balance + investment.amount + totalProfit;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, {balance}, {new:true});
  // await user.save();

  // Save the updated investment
  await investment.save();
  res.status(200).json({
    message: 'Investment closed',
    data: investment
  });
};

exports.updateInvestments = async (req, res) => {
  const result = [];
  const investments = await Investment.find({ closingDate: null, closingTime: null });
  for (const investment of investments) {
    // Calculate the profit per day
    let dailyProfit = 0;
    if (investment.type === 'fixed') {
      dailyProfit = investment.amount * 0.1 / 30;
    } else if (investment.type === 'flexible') {
      dailyProfit = investment.amount * 0.05 / 30;
    } else if (investment.type === 'secure') {
      dailyProfit = investment.amount * 0.016 / 30;
    }

    // Add the daily profit to the total profit
    investment.profitGenerated += dailyProfit;
    investment.daysCounter++;

    // Check if the investment should be closed
    if (investment.type === 'fixed' && investment.daysCounter >= investment.duration * 30) {
      // Find the user
      const user = await User.findById(investment.user);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      // Update the closing date and time
      investment.closingDate = new Date();
      investment.closingTime = new Date().toLocaleTimeString();

      // Add the investment amount and total profit to the user's balance
      let balance = user.balance + investment.amount + investment.profitGenerated;
      const updatedUser = await User.findByIdAndUpdate(investment.user, {balance}, {new:true});
    }

    // Save the updated investment
    await investment.save();
    result.push(investment);
  }

  res.status(200).json({
    message: 'Investments updated',
    data: result
  });
};

exports.getAllInvestments = async (req, res) => {
  const investments = await Investment.find();
  res.status(200).json({
    message: 'All investments retrieved',
    data: investments
  });
};

exports.getRunningInvestments = async (req, res) => {
  const investments = await Investment.find({ closingDate: null, closingTime: null });
  res.status(200).json({
    message: 'Running investments retrieved',
    data: investments
  });
};

exports.getClosedInvestments = async (req, res) => {
  const investments = await Investment.find({ closingDate: { $ne: null }, closingTime: { $ne: null } });
  res.status(200).json({
    message: 'Closed investments retrieved',
    data: investments
  });
};

exports.getUserInvestments = async (req, res) => {
  // Find the investments of the user
  const investments = await Investment.find({ user: req.user._id });
  res.status(200).json({
    message: 'User investments retrieved',
    data: investments
  });
};
