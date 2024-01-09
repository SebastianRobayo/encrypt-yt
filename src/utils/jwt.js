const { sign, verify } = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "token2024";

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "5m",
  });
  return jwt;
};

const verifyToken = (jwt) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

module.exports = { generateToken, verifyToken };
