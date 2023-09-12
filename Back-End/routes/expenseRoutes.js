const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

// ----------------- get all expenses route -----------------
router.get("/getAllExpenses", expenseController.getAllExpenses);

// ----------------- add expense route -----------------
router.post("/addExpense", expenseController.createExpense);

// ----------------- delete expense route -----------------
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

// ----------------- update expense route -----------------
router.put("/updateExpense/:id", expenseController.updateExpense);

module.exports = router;
