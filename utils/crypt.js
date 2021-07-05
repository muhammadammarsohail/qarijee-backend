const bcrypt = require("bcrypt");

const generateHash = async (password, salt = 10) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const compareHash = async (password, hash) => {
  const check = await bcrypt.compare(password, hash);
  return check;
};

module.exports = { generateHash, compareHash };
