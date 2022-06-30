module.exports = (intermidiary, order) => {
  if (typeof intermidiary.type === "string") {
    intermidiary.type = JSON.parse(intermidiary.type);
  }

  return {
    id: intermidiary.id,
    name: intermidiary.name,
    intermidiary_order: {
      id: order.id,
      name: order.name,
    },
    type: intermidiary.type,
    createdAt: intermidiary.createdAt,
  };
};
