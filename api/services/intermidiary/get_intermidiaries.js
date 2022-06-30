const { Intermidiary, Order } = require("../../models");
const serialize_intermidiary = require("./serialize_intermidiary");

module.exports = async () => {
  const intermidiaries = await Intermidiary.findAll();

  if (!intermidiaries.length) return [];

  const parsedIntermidiaries = JSON.parse(JSON.stringify(intermidiaries));

  const data = await Promise.all(
    parsedIntermidiaries.map(async (intermidiary) => {
      const order = await Order.findOne({
        where: { id: intermidiary.intermidiary_order },
      });

      return serialize_intermidiary(intermidiary, order);
    })
  );

  return { data };
};
