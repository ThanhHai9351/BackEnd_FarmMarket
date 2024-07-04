const router = require("express").Router();
const orderController = require("../controllers/OrderController");

router.post("/create", orderController.createOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.get("/getAll", orderController.getAllOrder);
router.get("/getOrderFromUser/:id", orderController.getAllOrderFromUser);
router.get("/detail/:id", orderController.getdetailOrder);
router.post("/update/:id", orderController.updateOrder);

module.exports = router;
