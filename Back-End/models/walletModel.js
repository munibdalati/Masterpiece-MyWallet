const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    expense: {
      type: Number,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
  },
);

// -----------------create a default wallet -----------------
WalletSchema.statics.createDefaultWallet = async function (id) {
   const wallet = await this.create({
      userId: id,
      balance: 0,
      income: 0,
      expense: 0,
      transactions: [],
   });

   return wallet;
};

// -----------------add transation method -----------------
WalletSchema.statics.addTransaction = async function (
  type,
  category, value, date, cashCard, currency
) {
  // validation
  if (!type || !category || !value || !date || !cashCard || !currency) {
    throw Error("كل الحقول يجب أن تُملأ");
  }

  const transaction = await this.create({  type,
    category, value, date, cashCard, currency });

  return transaction;
};

const walletModel = mongoose.model("Wallet", WalletSchema);

module.exports = walletModel;
