require("../config/environment")();
const Sequelize = require("sequelize");
const database = require("../config").database;

class SequelizeClass {
  static init() {
    if (!this.initialized) {
      this.sequelize = new Sequelize(database.name, database.username, database.password, {
        dialect: "postgres",
        host: database.host,
        dialectOptions: {
          useUtc: false,
        },
        timezone: "+01:00",
      });

      this.initialized = true;
    }

    return this.sequelize;
  }
}

module.exports = SequelizeClass.init();
