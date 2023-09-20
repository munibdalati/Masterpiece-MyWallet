const express = require("express");
const userController = require("../controllers/userController");
const walletModel = require("../models/walletModel");

const router = express.Router();

// ----------------- get all users route -----------------
router.get("/getAllUsers", userController.getAllUsers);

// ----------------- login route -----------------
router.post("/login", userController.loginUser);

// ----------------- signup route -----------------
router.post('/register', userController.register);

// ----------------- update user route -----------------
router.put("/update/:id", userController.updateUser);

// ----------------- update user route -----------------
router.delete("/delete/:id", userController.deleteUser);

// ----------------- forgot password route -----------------
// router.post('/forgot-password', userController.forgotPassword);

// ----------------- reset password route -----------------
// router.put('/reset-password/:resetToken', userController.resetPassword);

module.exports = router;
