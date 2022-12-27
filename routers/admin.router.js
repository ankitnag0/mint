const express = require('express');
const router = express.Router();

// Import the controllers
const { createAdmin, loginAdmin } = require('../controllers/admin.controller');

// Define the routes
router.post('/create', createAdmin);
router.post('/login', loginAdmin);

module.exports = router;
