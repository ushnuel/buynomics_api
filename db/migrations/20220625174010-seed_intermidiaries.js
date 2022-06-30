"use strict";

async function up({ context: queryInterface }) {
  const intermidiaries = [
    {
      order: 1,
      name: "Coca Cola",
      type: {
        range: {
          from: "0.08",
          to: "2",
          step: "0.02",
        },
      },
    },
    {
      order: 2,
      name: "US Foods",
      type: {
        range: {
          from: "0.012",
          to: "1",
          step: "0.03",
        },
      },
    },
    {
      order: 2,
      name: "Gordon Food Service",
      type: {
        dropDown: [
          { options: "Promotions 20%", value: "0.2" },
          { options: "Promotions 50%", value: "0.5" },
        ],
      },
    },
    {
      order: 3,
      name: "Costco",
      type: {
        range: {
          from: "0.015",
          to: "5",
          step: "0.05",
        },
      },
    },
    {
      order: 3,
      name: "Walmart",
      type: {
        range: {
          from: "0.08",
          to: "2",
          step: "0.02",
        },
      },
    },
    {
      order: 3,
      name: "Whole Foods",
      type: {
        dropDown: [
          { options: "Promotions 10%", value: "0.1" },
          { options: "Promotions 30%", value: "0.3" },
        ],
      },
    },
  ];

  for (let intermidiary of intermidiaries) {
    await queryInterface.sequelize.query(`
      INSERT INTO intermidiaries (name, intermidiary_order, type, created_at, updated_at)
      VALUES ('${intermidiary.name}', ${intermidiary.order}, '${JSON.stringify(
      intermidiary.type
    )}',  now(), now());
    `);
  }
}

async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`
    DELETE FROM intermidiaries
  `);
}

module.exports = { up, down };
