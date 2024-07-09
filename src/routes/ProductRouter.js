const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/create", productController.createProduct);
router.get("/getAll", productController.getAllProducts);
router.get("/getAllProduct", productController.getAllAllProducts);
router.get("/detail/:id", productController.getDetailProduct);
router.post("/update/:id", productController.updateProduct);
router.post("/updateQuantity/:id", productController.updateQuantityProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
