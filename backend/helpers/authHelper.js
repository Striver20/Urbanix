const bcyrpt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcyrpt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password", error.message);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcyrpt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error comparing password", error.message);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
