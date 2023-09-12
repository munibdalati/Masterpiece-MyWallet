const Income = require("../models/incomeModel");

// --------------------get all incomes --------------------
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json({
      status: "success",
      results: incomes.length,
      data: {
        incomes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// --------------------create a income --------------------
exports.createIncome = async (req, res) => {
  try {
    // Extract values from the request body
    const { category, amount, currency, type, date } = req.body; 
    if (!category || !amount || !currency || !type || !date) {
      throw new Error("كل الحقول يجب أن تُملأ");
    }
    const income = await Income.addIncome(category, amount, currency, type, date);
    res.status(200).json({
      status: "success",
      data: {
        income,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
// --------------------delete a income --------------------

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
// --------------------update a Income --------------------

exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        income,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};