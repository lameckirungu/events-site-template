/**
 * QR controller
 * Handles requests related to QR code generation and validation
 */

const qrService = require('../services/qrService');
const db = require('../config/database');

class QRController {
  /**
   * Validate a QR code
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async validateQR(req, res, next) {
    try {
      const { qrCode } = req.body;
      
      if (!qrCode) {
        return res.status(400).json({ error: 'QR code is required' });
      }
      
      // Validate QR code
      const result = await qrService.validateQRCode(qrCode);
      
      res.json({
        valid: result.valid,
        message: result.message,
        ticket: result.valid ? {
          id: result.ticket.id,
          orderId: result.ticket.order_id,
          isUsed: result.ticket.is_used,
          usedAt: result.ticket.used_at
        } : null
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Generate a QR code for testing purposes
   * This would typically not be exposed in production
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async generateTestQR(req, res, next) {
    try {
      const { orderId, ticketId } = req.body;
      
      if (!orderId || !ticketId) {
        return res.status(400).json({ error: 'Order ID and Ticket ID are required' });
      }
      
      // Generate QR code
      const { qrCode, qrImageBase64 } = await qrService.generateQRCode(orderId, ticketId);
      
      res.json({
        qrCode,
        qrImageBase64
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QRController();
