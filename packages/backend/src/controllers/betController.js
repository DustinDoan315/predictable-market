const blockchainService = require("../services/blockchainService");

async function placeBet(req, res) {
  const { marketId, betAmount, userAddress, betType } = req.body;

  try {
    const parseBetAmount = BigInt(betAmount) * 10n ** 18n;
    const allowance = await blockchainService.checkAllowance(userAddress);
    if (allowance < parseBetAmount) {
      await blockchainService.approveTokens(userAddress, parseBetAmount);
    }

    const tx = await blockchainService.placeBet(
      marketId,
      parseBetAmount,
      userAddress,
      betType
    );

    res.status(200).json({ success: true, transaction: tx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing bet" });
  }
}

module.exports = { placeBet };
