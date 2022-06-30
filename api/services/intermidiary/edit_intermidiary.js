const { Order } = require("../../models");
const ApiError = require("../../../api_error");
const serialize_intermidiary = require("./serialize_intermidiary");
const getIntermidiaryById = require("./get_individual_intermidiary");

module.exports = async (intermidiaryId, updateData) => {
  const intermidiary = await getIntermidiaryById(intermidiaryId);

  if (updateData.intermidiary_order) {
    const orders = await Order.findAll();
    const validOrder = orders.find((item) => item.id == updateData.intermidiary_order);

    if (!validOrder) {
      throw new ApiError("Invalid Order id");
    }
  }

  await intermidiary.update(updateData);

  const order = await Order.findOne({
    where: { id: intermidiary.intermidiary_order },
  });

  return serialize_intermidiary(intermidiary, order);
};
