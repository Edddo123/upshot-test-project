const axios = require("axios");
const { WalletOwner } = require("../db");
// 1. grab info about total number of wallets
const CRYPTOPUNKASSETS = 10000;

const CronJob = require("cron").CronJob;
const job = new CronJob(
  "* * */3 * * *",
  function () {
    console.log("Started importing data");
    getUniqueWallets();
  },
  null,
  false,
  "America/Los_Angeles"
);

// 2. grab addresses of wallets

async function getUniqueWallets() {
  const nftOwners = {};
  let owners = [];
  let limit = 500;
  for (let i = 0; limit <= CRYPTOPUNKASSETS; limit += 500, i++) {
    const data = await axios.get(
      `https://api.upshot.xyz/v2/collections/cryptopunks/assets?limit=500&offset=0&include_stats=true&include_count=true`,
      {
        headers: {
          "x-api-key": "UP-39ef673e560bde0b20e95358",
        },
      }
    );
    for (asset of data.data.data.assets) {
      owners.push(asset.owner);

      // get number of how much each of them own
      if (`${asset.owner}` in nftOwners) {
        nftOwners[asset.owner].number_of_nfts += 1;
        nftOwners[asset.owner].appraisal_value += weiToEth(asset.appraisal.wei);
      } else {
        nftOwners[asset.owner] = {
          number_of_nfts: 1,
          appraisal_value: weiToEth(asset.appraisal.wei),
          wallet_address: asset.owner,
        };
      }
    }
  }

  await getEarnings(nftOwners);

  // normalize data for db needs
  const formattedItems = Object.values(nftOwners).map((e) => {
    let numberNftOwned = e?.number_of_nfts ?? 0;
    let volume = e?.volume && !isNaN(e?.volume) ? e.volume : 0;
    let sellEth = e?.sell_eth && !isNaN(e?.sell_eth) ? e.sell_eth : 0;
    let portfolioValue = e?.appraisal_value ?? 0;
    let totalGains =
      volume != 0 ? (100 * (sellEth + portfolioValue - volume)) / volume : 0;

    return {
      walletAddress: e.wallet_address,
      numberNftOwned,
      sellEth,
      volume,
      portfolioValue,
      rank: numberNftOwned * totalGains + volume,
    };
  });

  await WalletOwner.bulkCreate(formattedItems);
}

async function getEarnings(sellerEth) {
  for (let i = 0; i < 11; i++) {
    const response = await axios.get(
      `https://api.upshot.xyz/v2/collections/cryptopunks/events?limit=2000&offset=${i}&types=SALE&include_count=true&label_based_recipient=false&include_asset_metadata=false`,
      {
        headers: {
          "x-api-key": "UP-39ef673e560bde0b20e95358",
        },
      }
    );

    for (tx of response.data.data.events) {
      if (tx.currency_id === "ETH") {
        if (`${tx.to_address}` in sellerEth) {
          sellerEth[tx.to_address].sell_eth += weiToEth(+tx.wei);
        } else {
          sellerEth[tx.to_address] = {
            ...sellerEth[tx.to_address],
            sell_eth: weiToEth(+tx.wei),
            wallet_address: tx.to_address,
          };
        }

        if (`${tx.from_address}` in sellerEth) {
          sellerEth[tx.from_address].volume += weiToEth(+tx.wei);
        } else {
          sellerEth[tx.from_address] = {
            ...sellerEth[tx.from_address],
            volume: weiToEth(+tx.wei),
            wallet_address: tx.from_address,
          };
        }
      }
    }
  }
}

function weiToEth(wei) {
  return Number(BigInt(wei) / 1000000000000000000n);
}

module.exports = job;
