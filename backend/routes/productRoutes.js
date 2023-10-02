// Imported Required Framework And Module and created Express Router Instance
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

// All Product Routes
router.post("/add-product", productController.addProduct);
router.get("/product/:productId", productController.getProduct);
router.get("/explore-all", productController.getAllproduct);
router.get("/product-review/:productId",productController.getReview);
router.put("/product-review/:productId", productController.addReview);
router.get("/search",productController.search);

// Exporting Router
module.exports = router;
