const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 8000;
const authRoute = require("./routes/authRoute");
const app = express();

//Connect Database
connectDb();

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Port Connected");
});
