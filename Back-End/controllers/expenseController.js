const Expense = require("../models/expenseModel");

// --------------------get all expenses --------------------
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// --------------------create a expense --------------------
exports.createExpense = async (req, res) => {
  try {
    // Extract values from the request body
    const { category, amount, currency, type, date } = req.body; 
    if (!category || !amount || !currency || !type || !date) {
      throw new Error("كل الحقول يجب أن تُملأ");
    }
    const expense = await Expense.addExpense(category, amount, currency, type, date);
    res.status(200).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
// --------------------delete a expense --------------------

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
// --------------------update a expense --------------------

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};