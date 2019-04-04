/**
 * Index file for Sequelize Models
 *  - Opens Connection to the database
 *  - Synchronize and Associate Models
 * @exports {Object} db
 */
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// Defaults to "development" when no environment is defined
const env = process.env.NODE_ENV || "development";
const config = require("../database.config.json")[env];
const db = {};

/**
 * Sequelize Connection
 * Enables "logging" for development environment
 */
let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: Object.hasOwnProperty(config, "logging")
      ? config.logging
      // eslint-disable-next-line no-console
      : console.log
  }
);

// Read all models from this directory except "index.js"
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

// Associate models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Generates "db" object with all synchronized models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
