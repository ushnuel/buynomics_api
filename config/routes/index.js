const express = require("express");
const router = express.Router();

router.get("/", async (_, res) => {
  res.status(200).json({
    message: "Hello!",
    data: {
      platform: "Welcome to Buynamics API",
      version: "1.0",
    },
  });
});

const intermidiaryController = require("../../api/controllers/intermidiary_controller");

router.post("/intermidiaries", intermidiaryController.create);
router.get("/intermidiaries", intermidiaryController.readAll);
router.get("/intermidiaries/:id", intermidiaryController.read);
router.put("/intermidiaries/:id", intermidiaryController.update);
router.delete("/intermidiaries/:id", intermidiaryController.delete);

const orderController = require("../../api/controllers/order_controller");
router.get("/orders", orderController.readAll);

module.exports = router;
