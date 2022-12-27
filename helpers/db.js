const mongoose = require('mongoose');

module.exports = function() {
  // Connect to the MongoDB database
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGO_URI);
  // Handle the connection event
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
  });
};