const router = require("express").Router();
const orderController = require("../controllers/OrderController");

router.post("/create", orderController.createOrder);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
