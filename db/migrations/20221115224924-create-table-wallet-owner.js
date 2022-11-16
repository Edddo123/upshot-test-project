"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WalletOwners", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      wallet_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_nft_owned: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      sell_eth: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      portfolio_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      volume: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      rank: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("WalletOwners");
  },
};
