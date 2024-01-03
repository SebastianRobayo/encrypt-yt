const { hash, compare } = require("bcrypt");

const encrypt = async (pass) => {
  const passHash = await hash(pass, 8);
  return passHash;
};

const verified = async (pass, passHash) => {
  const verify = await compare(pass, passHash);
  return verify;
};

module.exports = { encrypt, verified };
