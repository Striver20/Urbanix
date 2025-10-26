const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 8000;
const authRoute = require("./routes/authRoute");
const app = express();
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");

//Connect Database
connectDb();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : "http://localhost:3000",
    credentials: true,
  })
);

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Urbanix API is running successfully!",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Available routes:`);
  console.log(`   Auth: http://localhost:${PORT}/api/v1/auth`);
  console.log(`   Products: http://localhost:${PORT}/api/v1/product`);
  console.log(`   Categories: http://localhost:${PORT}/api/v1/category`);
  console.log(`   Orders: http://localhost:${PORT}/api/v1/order`);
});
