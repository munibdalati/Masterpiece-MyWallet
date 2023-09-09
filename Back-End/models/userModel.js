const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//creating the schema (how data is arranged in the database)
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "الرجاء إدخال اسمك"],
    },
    email: {
      type: String,
      required: [true, "الرجاء إدخال بريدك الإلكتروني"],
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "أدخل بريد إلكتروني صالح",
      ],
    },
    password: {
      type: String,
      required: [true, "أدخل كلمة سر"],
      minlength: 6,
      select: false, // we don't want to return password
    },
    //adding useType to the Schema to show if the user is user or admin
    userType: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
// -----------------new static signup method -----------------
UserSchema.statics.addUser = async function (
  username,
  email,
  password,
) {
  //validation
  if (!username || !email || !password) {
    throw Error("كل الحقول يجب أن تُملأ");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("البريد الإلكتروني المدخل مستخدم سابقًا");
  }

  const user = await this.create({ username, email, password });

  return user;
};

// ----------------- save -----------------

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); //the higher the number the more secure
  this.password = await bcrypt.hash(this.password, salt); //it will save the new password in the password field
  next(); //save the new password
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ----------------- Reset Password Token -----------------
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing the token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //10 minutes, 60 seconds, 1000 milliseconds,

  return resetToken;
};
const userModel = mongoose.model("userModel", UserSchema);

module.exports = userModel;
