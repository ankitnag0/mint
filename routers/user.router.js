const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser, loginUser, getMyDetails, getUserBalance } = require('../controllers/user.controller');
const router = express.Router();
const {authenticate, authenticateAdmin} = require('../helpers/authentication');

// Define routes for the /users path
router.post('/', createUser);
router.put('/', authenticate, updateUser);
router.post('/login', loginUser);
router.get('/me/refresh', authenticate, getMyDetails);
router.get('/balance', authenticate, getUserBalance);


//admin routes
router.get('/', getUsers);
// router.get('/:id', authenticate, getUserById);
router.delete('/:id', deleteUser);

module.exports = router;