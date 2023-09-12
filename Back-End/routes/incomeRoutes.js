const express = require("express");
const incomeController = require("../controllers/incomeController");

const router = express.Router();

// ----------------- get all Incomes route -----------------
router.get("/getAllIncomes", incomeController.getAllIncomes);

// ----------------- add Income route -----------------
router.post("/addIncome", incomeController.createIncome);

// ----------------- delete Income route -----------------
router.delete("/deleteIncome/:id", incomeController.deleteIncome);

// ----------------- update Income route -----------------
router.put("/updateIncome/:id", incomeController.updateIncome);

module.exports = router;
