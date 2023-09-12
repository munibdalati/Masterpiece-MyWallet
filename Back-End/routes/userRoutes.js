const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ----------------- login route -----------------
router.post('/login', userController.loginUser);

// ----------------- signup route -----------------
router.post('/register', userController.register);

// ----------------- update user route -----------------
router.put('/update/:id', userController.updateUser);

// ----------------- forgot password route -----------------
// router.post('/forgot-password', userController.forgotPassword);

// ----------------- reset password route -----------------
// router.put('/reset-password/:resetToken', userController.resetPassword);

module.exports = router;
