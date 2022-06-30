const getIntermidiaryById = require("./get_individual_intermidiary");

module.exports = async (intermidiaryId) => {
  const intermidiary = await getIntermidiaryById(intermidiaryId);

  await intermidiary.destroy();
};
