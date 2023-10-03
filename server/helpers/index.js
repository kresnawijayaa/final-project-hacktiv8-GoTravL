const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY || "rahasia"

const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};
const comparePassword = (hashedpwd, password) => {
  return bcrypt.compareSync(hashedpwd, password);
};

const signToken = (payload) => {
  return jwt.sign(payload, JWT_KEY);
};
const verifyToken = (token) => {
  return jwt.verify(token, JWT_KEY);
};

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
};
