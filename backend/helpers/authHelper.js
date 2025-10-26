const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password", error.message);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error comparing password", error.message);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
