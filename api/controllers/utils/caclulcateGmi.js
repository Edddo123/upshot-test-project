const { Sequelize } = require("sequelize");
const { WalletOwner } = require("../../../db");

async function gmiCalculator(address) {
  const number_wallets = await WalletOwner.count();

  const user = await WalletOwner.findOne({
    where: { walletAddress: address },
  });

  const users = await WalletOwner.findAll({
    order: [["rank", "DESC"]],
  });

  let rank = 0;
  for (u of users) {
    rank++;
    if (u.walletAddress == address) break;
  }

  const gmi = (1000 * (number_wallets - rank)) / number_wallets;

  return {
    gmi,
    rank,
    owned: user.numberNftOwned,
    sale: user.sellEth,
    profit: user.sellEth - user.volume,
  };
}

module.exports = gmiCalculator