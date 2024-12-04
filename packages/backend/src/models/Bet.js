const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Bet = sequelize.define("Bet", {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  marketId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Markets",
      key: "id",
    },
  },
  betType: {
    type: DataTypes.ENUM("YES", "NO"),
    allowNull: false,
  },
});

module.exports = Bet;
