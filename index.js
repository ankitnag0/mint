const express = require('express');
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routers/user.router');
const investmentRouter = require('./routers/investment.router');
const transactionRouter = require('./routers/transaction.router');
const adminRouter = require('./routers/admin.router');
const db = require('./helpers/db');
const {errorHandler} = require('./helpers/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

// Use the routers for the /users, /investments, and /transactions paths
app.use('/users', userRouter);
app.use('/investments', investmentRouter);
app.use('/transactions', transactionRouter);
app.use('/admin', adminRouter);

app.use(errorHandler);

db();

app.listen(3000, 'localhost', () => {
  console.log('Server listening on port 3000');
});