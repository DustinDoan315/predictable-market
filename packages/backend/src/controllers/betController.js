const blockchainService = require("../services/blockchainService");

async function placeBetYes(req, res) {
  const { marketId, betAmount, userAddress } = req.body;

  try {
    const allowance = await blockchainService.checkAllowance(userAddress);

    if (allowance < betAmount) {
      await blockchainService.approveTokens(userAddress, betAmount);
    }

    const tx = await blockchainService.placeBetYes(
      marketId,
      betAmount,
      userAddress
    );

    res.status(200).json({ success: true, transaction: tx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing bet" });
  }
}

module.exports = { placeBetYes };
