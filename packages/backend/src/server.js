const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const marketRoutes = require("./routes/marketRoutes");
const betRoutes = require("./routes/betRoutes");
const { testDbConnection } = require("./config/database");
const Market = require("./models/Market");
const Bet = require("./models/Bet");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register Routes
app.use("/api/market", marketRoutes);
app.use("/api/bet", betRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await testDbConnection();

  await Market.sync();
  await Bet.sync();
});
