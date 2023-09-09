const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ----------------- login route -----------------
router.post('/login', userController.login);

// ----------------- signup route -----------------
router.post('/register', userController.register);

// ----------------- forgot password route -----------------
router.post('/forgot-password', userController.forgotPassword);

// ----------------- reset password route -----------------
router.put('/reset-password/:resetToken', userController.resetPassword);

module.exports = router;
