// Imported Required Framework And Module and created Express Router Instance
const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/paymentControllers');

//route that listens for POST requests to "/createOrder" and handles them using the createOrder controller function
router.post("/createOrder", paymentControllers.createOrder);

// Exporting Router
module.exports = router;