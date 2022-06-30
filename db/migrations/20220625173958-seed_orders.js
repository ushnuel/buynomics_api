"use strict";

async function up({ context: queryInterface }) {
  const orders = ["Manufacturer", "Distributor", "Retailers"];

  for (let order of orders) {
    await queryInterface.sequelize.query(`
      INSERT INTO orders (name, created_at, updated_at)
      VALUES ('${order}', now(), now())
    `);
  }
}

async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`
    DELETE FROM orders
  `);
}

module.exports = { up, down };
