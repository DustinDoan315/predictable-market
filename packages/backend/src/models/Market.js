const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Market = sequelize.define("Market", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  market: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creatorImageHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalYesAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalNoAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  eventCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resolverUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Market;
