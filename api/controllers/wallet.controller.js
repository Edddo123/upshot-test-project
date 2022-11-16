const gmiCalculator = require("./utils/caclulcateGmi");

module.exports.GetGmiScore = async (req, res, next) => {
  const { address } = req.params;

  const gmi = await gmiCalculator(address);

  res.status(200).json(gmi);
};
