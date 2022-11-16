"use strict";
const { Model } = require("sequelize");

class WalletOwner extends Model {
};


module.exports = (sequelize, DataTypes) => {
  WalletOwner.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'wallet_address'
      },
      numberNftOwned: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'number_nft_owned'
      },
      sellEth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'sell_eth'
      },
      portfolioValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'portfolio_value'
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "WalletOwner",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return WalletOwner;
};
