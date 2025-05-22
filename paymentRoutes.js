/**
 * Payment routes
 * Defines API endpoints for payment processing
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Initiate payment
router.post('/initiate', paymentController.initiatePayment);

// M-Pesa callback
router.post('/callback', paymentController.mpesaCallback);

// Check payment status
router.get('/status/:orderId', paymentController.checkPaymentStatus);

module.exports = router;
