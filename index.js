/**
 * Routes index
 * Aggregates and exports all API routes
 */

const express = require('express');
const router = express.Router();

// Import route modules
const ticketRoutes = require('./ticketRoutes');
const paymentRoutes = require('./paymentRoutes');
const qrRoutes = require('./qrRoutes');
const eventRoutes = require('./eventRoutes');

// Use route modules
router.use('/tickets', ticketRoutes);
router.use('/payments', paymentRoutes);
router.use('/qr', qrRoutes);
router.use('/events', eventRoutes);

module.exports = router;
