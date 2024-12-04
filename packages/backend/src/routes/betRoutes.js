const express = require("express");
const router = express.Router();
const betController = require("../controllers/betController");

router.post("/placeYesBet", betController.placeBetYes);

module.exports = router;
