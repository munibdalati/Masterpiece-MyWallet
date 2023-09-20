require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
const cors = require("cors");

// express app
const app = express();

// Configure CORS
app.use(cors());

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);


// Port
const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
