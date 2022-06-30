"use strict";

const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("intermidiaries", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    intermidiary_order: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.JSON,
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
}

async function down(queryInterface, _) {
  return queryInterface.dropTable("intermidiaries");
}

module.exports = { up, down };
