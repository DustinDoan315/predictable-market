const { ethers } = require("ethers");
const {
  INFURA_URL,
  CONTRACT_ADDRESS,
  POLY_TOKEN_ADDRESS,
  PRIVATE_KEY,
} = require("../config/config");
const ERC20_ABI = require("../abis/ERC20_ABI.json");
const POLYMARKET_ABI = require("../abis/Polymarket_ABI.json");

// Create a provider and signer
const provider = new ethers.JsonRpcProvider(INFURA_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Polymarket contract instance
const polymarketContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  POLYMARKET_ABI,
  signer
);
// PolyToken (ERC20) contract instance
const polyTokenContract = new ethers.Contract(
  POLY_TOKEN_ADDRESS,
  ERC20_ABI,
  signer
);

// Check the allowance of JLT tokens
async function checkAllowance(userAddress) {
  const allowance = await polyTokenContract.allowance(
    userAddress,
    CONTRACT_ADDRESS
  );
  return allowance;
}

// Approve tokens to the contract
async function approveTokens(userAddress, amount) {
  const userSigner = new ethers.Wallet(userAddress, provider);
  const tx = await polyTokenContract
    .connect(userSigner)
    .approve(CONTRACT_ADDRESS, amount);
  await tx.wait();
  return tx;
}

// Create a new market bet
async function createMarket({
  market,
  creatorImageHash,
  description,
  resolverUrl,
  endTimestamp,
}) {
  try {
    const tx = await polymarketContract.createMarket(
      market,
      creatorImageHash,
      description,
      resolverUrl,
      endTimestamp
    );
    const receipt = await tx.wait();
    return { transaction: tx, receipt };
  } catch (error) {
    console.error("Error creating market:", error);
    throw new Error(
      "Failed to create market. Please check the transaction details."
    );
  }
}

// Place a "Yes" bet
async function placeBetYes(marketId, betAmount, userAddress) {
  const tx = await polymarketContract
    .connect(signer)
    .addYesBet(marketId, betAmount, {
      from: userAddress,
    });
  await tx.wait();
  return tx;
}

module.exports = {
  checkAllowance,
  approveTokens,
  createMarket,
  placeBetYes,
};
