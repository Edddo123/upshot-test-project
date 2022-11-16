const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.development);
const { DataTypes } = require("sequelize");

const modelDefiners = [];
const normalizedPath = require("path").join(__dirname, "models");
require("fs")
  .readdirSync(normalizedPath)
  .forEach((file) => {
    modelDefiners.push(require(`./models/${file}`));
  });

const models = [];
// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  models.push(modelDefiner(sequelize, DataTypes));
}

for (const model of models) {
  if (model.associate) {
    model.associate(sequelize.models);
  }
}

module.exports = sequelize.models;
