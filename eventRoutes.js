/**
 * Event routes
 * Defines API endpoints for event information
 */

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get event details
router.get('/:id?', eventController.getEventDetails);

// Get ticket types for an event
router.get('/:id/tickets', eventController.getTicketTypes);

// Get artists/lineup for an event
router.get('/:id/artists', eventController.getArtists);

// Get gallery media for an event
router.get('/:id/gallery', eventController.getGallery);

module.exports = router;
