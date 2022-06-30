const { Intermidiary, Order } = require("../../models");
const serialize_intermidiary = require("./serialize_intermidiary");

module.exports = async (payload) => {
  const intermidiary = await Intermidiary.create({
    intermidiary_order: payload.intermidiary_order,
    name: payload.name,
    type: payload.type,
  });

  const order = await Order.findOne({
    where: { id: intermidiary.intermidiary_order },
  });

  return serialize_intermidiary(intermidiary, order);
};
