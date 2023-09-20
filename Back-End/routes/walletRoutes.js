const express = require("express");
const walletController = require('../controllers/walletController');

const router = express.Router();


// get all transactions
router.get("/getAllWallets", walletController.getAllWallets);
// get all transactions
router.get("/getUserWallet/:id", walletController.getUserWallet);
// add transaction
router.post("/addTransaction/:id", walletController.createTransaction);

// delete transaction
router.delete("/deleteTransaction/:userId/:transactionId", walletController.deleteTransaction);

// update transaction
// router.put("/updateTransaction/:userId/:transactionId", walletController.updateTransaction);



module.exports = router;