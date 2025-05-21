/**
 * Event controller
 * Handles requests related to event information
 */

const db = require('../config/database');
const config = require('../config/environment');

class EventController {
  /**
   * Get event details
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getEventDetails(req, res, next) {
    try {
      const eventId = req.params.id || req.query.id;
      
      // If no event ID is provided, return the default event from config
      if (!eventId) {
        return res.json({
          name: config.event.name,
          date: config.event.date,
          venue: config.event.venue,
          address: config.event.address,
          coordinates: config.event.coordinates
        });
      }
      
      // Get event details from database
      const event = await db.getEvent(eventId);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Get ticket types for an event
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getTicketTypes(req, res, next) {
    try {
      const eventId = req.params.id || req.query.id;
      
      if (!eventId) {
        return res.status(400).json({ error: 'Event ID is required' });
      }
      
      const ticketTypes = await db.getTicketTypes(eventId);
      res.json(ticketTypes);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Get artists/lineup for an event
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getArtists(req, res, next) {
    try {
      const eventId = req.params.id || req.query.id;
      
      if (!eventId) {
        return res.status(400).json({ error: 'Event ID is required' });
      }
      
      const artists = await db.getArtists(eventId);
      res.json(artists);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Get gallery media for an event
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getGallery(req, res, next) {
    try {
      const eventId = req.params.id || req.query.id;
      
      if (!eventId) {
        return res.status(400).json({ error: 'Event ID is required' });
      }
      
      const gallery = await db.getGallery(eventId);
      res.json(gallery);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
