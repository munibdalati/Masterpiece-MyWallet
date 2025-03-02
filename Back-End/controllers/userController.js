const crypto = require("crypto");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
// --------------------get all users --------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const wallets = await Wallet.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
        wallets
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
//-------------register route----------------------
exports.register = async (req, res) => {
  const { username, email, password, age, gender } = req.body;
  try {

    // Step 1: Register the user
    const user = await User.addUser(username, email, password, age, gender);

    // Step 2: Create a wallet for the registered user
    const wallet = await Wallet.createDefaultWallet(user._id);

    // Step 3: Generate a token
    const token = createToken(user._id);

    // Step 4: Send the response with user data, wallet, and token
    res.status(200).json({
      status: "success",
      data: {
        user,
        wallet,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//--------------login route----------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create token
    // const token = user.getSignedToken();
    const token = createToken(user._id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
      token: token,
    });

  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//--------------update route----------------------
exports.updateUser = async (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { age } = req.body;
  const { gender } = req.body;
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: username,
        email: email,
        password: password,
        age: age,
        gender: gender,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Update error:", error); // Add this line for debugging
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//--------------delete route----------------------
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the user by ID
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Find the associated wallet by userId and delete it using deleteOne
    await Wallet.deleteOne({ userId: user._id });

    // Delete the user
    await User.findByIdAndDelete(
      { _id: id },)
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Delete error:", error); // Add this line for debugging
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


//---------------forgotpassword route--------------

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(email)
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();

    //The link which will be sent by email
    const resetUrl = `http://localhost:3000/api/user/resetPassword/${resetToken}`;
    const message = `
<h1>You have requested a password reset</h1>
<p>Please go to this link to reset your password</p>
<a href=${resetUrl} clicktracking=off> ${resetUrl}</a>`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new ErrorResponse("Email could not be send", 500));
    }
  } catch (error) {
    next(error);
  }
};

//----------------resetpassword route----------------
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Reset Success",
      token: user.getSignedToken(),
    });
  } catch (error) {
    next(error);
  }
};

