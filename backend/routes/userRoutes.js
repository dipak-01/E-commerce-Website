// Imported Required Framework And Module and created Express Router Instance
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

// All User Routes
router.get("/user-status", userController.status);
router.post("/user-signup", userController.signup);
router.post("/user-login", userController.login);
router.post("/user-logout", userController.logout);
router.put("/add-to-cart-only/:productId", userController.addToCartOnly);
router.put("/add-to-cart/:productId", userController.addToCart);
router.get("/cart", userController.getCart);
router.delete("/remove/:productId", userController.removeFromCart);
router.get("/totalamount", userController.totalamount);
router.put("/add-to-wishlist/:productId", userController.addToWishList);
router.get("/wishlist", userController.getWishList);
router.delete("/removefromwishlist/:productId", userController.removeFromWishList);
router.get("/viewprofile", userController.viewprofile);
router.get("/viewprofile/:userId", userController.view);
router.put("/user-update", userController.update);
router.delete("/delete-account", userController.deleteUser);
router.put("/clearCart", userController.clearCart);
router.get("/orderPlaced", userController.orderPlaced);

// Exporting Router
module.exports = router;
