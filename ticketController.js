/**
 * Ticket controller
 * Handles requests related to ticket management
 */

const db = require('../config/database');

class TicketController {
  /**
   * Get ticket information
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getTicket(req, res, next) {
    try {
      const { ticketId } = req.params;
      
      if (!ticketId) {
        return res.status(400).json({ error: 'Ticket ID is required' });
      }
      
      // Get ticket from database
      const { data: ticket, error } = await db.supabase
        .from('tickets')
        .select('*, orders(*), ticket_types(*)')
        .eq('id', ticketId)
        .single();
      
      if (error || !ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Get tickets for an order
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async getTicketsByOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      // Get tickets from database
      const { data: tickets, error } = await db.supabase
        .from('tickets')
        .select('*, ticket_types(*)')
        .eq('order_id', orderId);
      
      if (error) {
        return next(error);
      }
      
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
