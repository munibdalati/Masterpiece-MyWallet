const Wallet = require("../models/walletModel");
const uuid = require("uuid");

// --------------------get all wallets (for admin)------------------
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json({
      status: "success",
      results: wallets.length,
      data: {
        wallets,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
// --------------------get user wallet--------------------
exports.getUserWallet = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the id parameter from the URL

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is missing in the request" });
    }
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        status: "fail",
        message: "Wallet not found for the specified user ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        wallet,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

// --------------------create transaction--------------------
exports.createTransaction = async (req, res) => {
  // Step 1: Extract the id parameter from the URL

  const userId = req.params.id;

  // Step 2: Set body fields

  const { type, category, value, date, cashCard, currency } = req.body;

  try {
    if (!type || !category || !value || !date || !cashCard || !currency) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    // Find the wallet for the specified user
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        status: "fail",
        message: "Wallet not found for the specified user ID",
      });
    }
    // Create a unique ID for the transaction
    const transactionId = uuid.v4();
    // Create a new transaction object
    const transaction = {
      id: transactionId,
      type,
      category,
      value,
      date,
      cashCard,
      currency
    };
    if (transaction.type === "دخل") {
      wallet.income += transaction.value;
      wallet.balance += transaction.value;
    } else if (transaction.type === "مصروف") {
      wallet.expense += transaction.value;
      wallet.balance -= transaction.value;
    } else {
      // Handle invalid transaction types if needed
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    // Push the transaction into the wallet's transactions array
    wallet.transactions.push(transaction);

    await wallet.save();

    res.status(200).json({
      status: "success",
      data: {
        wallet: {
         balance: wallet.balance,
         income: wallet.income,
         expense: wallet.expense,
          transactions: wallet.transactions,

        },
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// --------------------delete a transaction --------------------
exports.deleteTransaction = async (req, res) => {
   try {
     const userId = req.params.userId; // Extract the userId parameter from the URL
     const transactionId = req.params.transactionId; // Extract the transactionId parameter from the URL

     // Find the user's wallet using userId
     const wallet = await Wallet.findOne({ userId });

     if (!wallet) {
       return res.status(404).json({
         status: "fail",
         message: "Wallet not found for the specified user ID",
       });
     }

     // Find the transaction in the wallet's transactions array
     const transactionIndex = wallet.transactions.findIndex(
       (transaction) => transaction.id === transactionId
     );

     if (transactionIndex === -1) {
       return res.status(404).json({
         status: "fail",
         message: "Transaction not found",
       });
     }

     // Remove the transaction from the array
     const deletedTransaction = wallet.transactions.splice(transactionIndex, 1)[0];

     // Update the wallet's balance, income, and expense based on the deleted transaction
     if (deletedTransaction.type === "دخل") {
       wallet.income -= deletedTransaction.value;
       wallet.balance -= deletedTransaction.value;
     } else if (deletedTransaction.type === "مصروف") {
       wallet.expense -= deletedTransaction.value;
       wallet.balance += deletedTransaction.value;
     }

     // Save the updated wallet
     await wallet.save();

     res.status(200).json({
       status: "Deleted successfully",
       data: {
         deletedTransaction,
       },
     });
   } catch (error) {
     res.status(404).json({
       status: "fail",
       message: error.message,
     });
   }
};

// --------------------update a transaction --------------------
// exports.updateTransaction = async (req, res) => {
//    try {
//      const userId = req.params.userId; // Extract the userId parameter from the URL
//      const transactionId = req.params.transactionId; // Extract the transactionId parameter from the URL
 
//      // Find the user's wallet using userId
//      const wallet = await Wallet.findOne({ userId });
 
//      if (!wallet) {
//        return res.status(404).json({
//          status: "fail",
//          message: "Wallet not found for the specified user ID",
//        });
//      }
 
//      // Find the transaction in the wallet's transactions array
//      const transaction = wallet.transactions.find(
//        (transaction) => transaction.id === transactionId
//      );
 
//      if (!transaction) {
//        return res.status(404).json({
//          status: "fail",
//          message: "Transaction not found",
//        });
//      }
 
//      // Store the previous transaction type and value
//      const prevTransactionType = transaction.type;
//      const prevTransactionValue = transaction.value;
 
//      // Update the transaction fields
//      transaction.type = req.body.type;
//      transaction.category = req.body.category;
//      transaction.value = req.body.value;
//      transaction.date = req.body.date;
//      transaction.cashCard = req.body.cashCard;
 
//      // Update the wallet's balance, income, and expense based on the updated transaction
//      if (prevTransactionType === "income") {
//        wallet.income -= prevTransactionValue;
//        wallet.balance -= prevTransactionValue;
//      } else if (prevTransactionType === "expense") {
//        wallet.expense -= prevTransactionValue;
//        wallet.balance += prevTransactionValue;
//      }
 
//      if (transaction.type === "income") {
//        wallet.income += transaction.value;
//        wallet.balance += transaction.value;
//      } else if (transaction.type === "expense") {
//        wallet.expense += transaction.value;
//        wallet.balance -= transaction.value;
//      }
 
//      // Save the updated wallet
//      await wallet.save();
 
//      res.status(200).json({
//        status: "updated successfully",
//        data: {
//          transaction,
//        },
//      });
//    } catch (error) {
//      res.status(404).json({
//        status: "fail",
//        message: error.message,
//      });
//    }
//  };
 