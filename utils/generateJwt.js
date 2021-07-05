const jwt = require("jsonwebtoken");

const signJWT = async (email) => {
  const token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = { signJWT };
