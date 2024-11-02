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

//Connect Database
connectDb();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
    credentials: true, // Enable credentials if needed
  })
);

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Port Connected");
});
