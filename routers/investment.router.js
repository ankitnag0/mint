const express = require('express');
const { makeInvestment, updateInvestments, closeInvestment, getAllInvestments, getRunningInvestments, getClosedInvestments, getUserInvestments } = require('../controllers/investment.controller');
const router = express.Router();

const {authenticate, authenticateAdmin} = require('../helpers/authentication');

// Define routes for the /investments path
router.get('/', authenticate, getUserInvestments);
router.post('/', authenticate, makeInvestment);
router.delete('/:id', authenticate, closeInvestment);

//admin endpoints
router.get('/all', authenticateAdmin, getAllInvestments);
router.get('/running', authenticateAdmin, getRunningInvestments);
router.get('/closed', authenticateAdmin, getClosedInvestments);
router.put('/', authenticateAdmin, updateInvestments); 

module.exports = router;