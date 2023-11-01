const Router = require("express");
const router = new Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const checkRole = require("../middleware/checkRole");

const OrderController = require("../controllers/orderController");

router.post("/addOrder", AuthMiddleware, OrderController.addOrder);
router.get("/myOrder/:id", AuthMiddleware, OrderController.getMyOrder);
router.put("/canelMyOrder/:id", AuthMiddleware, OrderController.canelMyOrder);
router.get(
  "/getAllOrderAdmin",
  checkRole("ADMIN"),
  OrderController.getAllOrderAdmin
);
router.put(
  "/changeStatusAdmin/:id",
  checkRole("ADMIN"),
  OrderController.changeStatusAdmin
);

router.post(
  "/setRatingMyOrder",
  AuthMiddleware,
  OrderController.setRatingMyOrder
);

module.exports = router;
