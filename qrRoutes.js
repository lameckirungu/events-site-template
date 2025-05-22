/**
 * QR routes
 * Defines API endpoints for QR code operations
 */

const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Validate QR code
router.post('/validate', qrController.validateQR);

// Generate test QR code (development only)
router.post('/generate-test', qrController.generateTestQR);

module.exports = router;
