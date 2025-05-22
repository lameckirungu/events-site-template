/**
 * Ticket routes
 * Defines API endpoints for ticket management
 */

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Get ticket information
router.get('/:ticketId', ticketController.getTicket);

// Get tickets for an order
router.get('/order/:orderId', ticketController.getTicketsByOrder);

module.exports = router;
