const express = require('express');
const { deposit, withdraw, getTransaction, getAllTransactions, getTransactionsByStatus, approve, reject, getUserTransactions } = require('../controllers/transaction.controller');
const router = express.Router();

const {authenticate, authenticateAdmin} = require('../helpers/authentication');

// Define routes for the /transactions path
router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);
router.get('/', authenticate, getUserTransactions);

//admin routes
router.get('/all', authenticateAdmin, getAllTransactions);
router.get('/:id',authenticateAdmin, getTransaction);
router.get('/status/:status',authenticateAdmin, getTransactionsByStatus);
router.put('/approve/:id',authenticateAdmin, approve);
router.put('/reject/:id',authenticateAdmin, reject);

module.exports = router;