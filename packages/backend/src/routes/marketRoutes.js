const express = require("express");
const router = express.Router();
const marketController = require("../controllers/marketController");

router.post("/create", marketController.createMarket);

module.exports = router;
