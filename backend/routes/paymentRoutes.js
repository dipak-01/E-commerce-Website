const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/paymentControllers');

router.post("/createOrder", paymentControllers.createOrder);

module.exports = router;