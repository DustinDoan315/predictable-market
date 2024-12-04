require("dotenv").config();
module.exports = {
  INFURA_URL: process.env.INFURA_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  POLY_TOKEN_ADDRESS: process.env.POLY_TOKEN_ADDRESS,
};
