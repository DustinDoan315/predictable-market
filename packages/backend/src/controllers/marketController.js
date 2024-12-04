const Market = require("../models/Market");
const blockchainService = require("../services/blockchainService");

async function createMarket(req, res) {
  try {
    const { market, creatorImageHash, description, resolverUrl, endTimestamp } =
      req.body;

    if (
      !market ||
      !creatorImageHash ||
      !description ||
      !resolverUrl ||
      !endTimestamp
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }

    const tx = await blockchainService.createMarket({
      market,
      creatorImageHash,
      description,
      resolverUrl,
      endTimestamp: Number(endTimestamp),
    });

    const newMarket = await Market.create({
      market,
      creatorImageHash,
      description,
      resolverUrl,
      endTimestamp,
      timestamp: new Date(),
      createdBy: "0xbB66BcBcE152273DF812bd988405168ADB889285",
      totalAmount: 0,
      totalYesAmount: 0,
      totalNoAmount: 0,
      eventCompleted: false,
    });

    res.status(200).json({ success: true, transaction: tx, market: newMarket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating market" });
  }
}

module.exports = { createMarket };
