const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/ShoppingCartController");

router.post("/create", shoppingCartController.createShoppingCart);
router.get("/getAll", shoppingCartController.getAllShoppingCarts);
router.delete("/delete/:id", shoppingCartController.deleteShoppingCart);
router.delete(
  "/deleteFromUser/:id",
  shoppingCartController.deleteShoppingCartFromUser
);
router.post("/update/:id", shoppingCartController.updateShoppingCart);
module.exports = router;
