const { Order } = require("../models");
const BaseController = require("./base_controller");

class OrderController extends BaseController {
  static async readAll(_, res, next) {
    try {
      const intermidiary = await Order.findAll();

      res.status(200).json({
        message: "User retrieved successfully",
        data: JSON.parse(JSON.stringify(intermidiary)),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
