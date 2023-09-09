require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// Connect DB
connectDB();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/private", require("./routes/private"));
app.use("/api/user", userRoutes);

//port
const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

