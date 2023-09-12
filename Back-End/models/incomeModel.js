const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

// -----------------add Expense method -----------------
IncomeSchema.statics.addIncome = async function (
  category,
  amount,
  currency,
  type,
  date
) {
  // validation
  if (!category || !amount || !currency || !type || !date) {
    throw Error("كل الحقول يجب أن تُملأ");
  }
  const income = await this.create({ category, amount, currency, type, date });

  return income;
};

const incomeModel = mongoose.model("incomes", IncomeSchema);

module.exports = incomeModel;
