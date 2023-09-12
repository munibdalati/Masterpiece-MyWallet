const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
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
ExpenseSchema.statics.addExpense = async function (
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
  const expense = await this.create({ category, amount, currency, type, date });

  return expense;
};

const expenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = expenseModel;
