const ApiError = require("../../../api_error");
const { Intermidiary, Order } = require("../../models");
const serialize_intermidiary = require("./serialize_intermidiary");

module.exports = async (intermidiaryId, returnSerializedData = false) => {
  const intermidiary = await Intermidiary.findOne({
    where: {
      id: intermidiaryId,
    },
  });

  if (!intermidiary) {
    throw new ApiError("Intermidiary not found");
  }

  if (!returnSerializedData) return intermidiary;

  const order = await Order.findOne({
    id: intermidiary.intermidiary_order,
  });

  return serialize_intermidiary(intermidiary, order);
};
