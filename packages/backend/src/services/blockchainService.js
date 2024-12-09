const { ethers } = require("ethers");
const {
  INFURA_URL,
  MARKET_ADDRESS,
  TOKEN_ADDRESS,
  PRIVATE_KEY,
} = require("../config/config");
const ERC20_ABI = require("../abis/ERC20_ABI.json");
const MARKET_ABI = require("../abis/market_ABI.json");

const provider = new ethers.JsonRpcProvider(INFURA_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);
const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);

// Check the allowance of JLT tokens
async function checkAllowance(userAddress) {
  const allowance = await tokenContract.allowance(userAddress, MARKET_ADDRESS);
  return allowance;
}

// Approve tokens to the contract
async function approveTokens(userAddress, amount) {
  const userSigner = new ethers.Wallet(PRIVATE_KEY, provider);
  const tx = await tokenContract
    .connect(userSigner)
    .approve(MARKET_ADDRESS, amount);
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
    const tx = await marketContract.createMarket(
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

// Place a "Yes" or "No" bet
async function placeBet(marketId, betAmount, userAddress, betType) {
  const tx = await marketContract
    .connect(signer)
    .placeBet(marketId, betType, betAmount, {
      from: userAddress,
    });
  await tx.wait();
  return tx;
}

module.exports = {
  checkAllowance,
  approveTokens,
  createMarket,
  placeBet,
};
