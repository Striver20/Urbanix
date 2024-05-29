const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDb Connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err.message);
  }
};

module.exports = connectDb;
