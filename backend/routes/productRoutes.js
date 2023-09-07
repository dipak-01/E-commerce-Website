const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.post("/add-product", productController.addProduct);
router.get("/product/:productId", productController.getProduct);
router.get("/explore-all", productController.getAllproduct);
router.put("/product-review/:productId", productController.addReview);

module.exports = router;
