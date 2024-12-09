const express = require("express");
const router = express.Router();
const betController = require("../controllers/betController");

router.post("/placeBet", betController.placeBet);

module.exports = router;
