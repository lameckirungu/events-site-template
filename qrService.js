/**
 * QR Code service
 * This file provides an interface for QR code generation and validation
 */

const QRCode = require('qrcode');
const crypto = require('crypto');
const db = require('../config/database');

class QRService {
  /**
   * Generate a QR code for a ticket
   * @param {string} orderId - Order ID to encode in QR
   * @param {string} ticketId - Ticket ID to encode in QR
   * @returns {Promise<{qrCode: string, qrImageBase64: string}>} QR code data and image
   */
  async generateQRCode(orderId, ticketId) {
    try {
      // Create a unique token that combines order ID and ticket ID
      // This makes each QR code unique even within the same order
      const token = this.generateToken(orderId, ticketId);
      
      // Generate QR code as base64 image
      const qrImageBase64 = await QRCode.toDataURL(token);
      
      return {
        qrCode: token,
        qrImageBase64
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }
  
  /**
   * Validate a QR code
   * @param {string} qrCode - QR code to validate
   * @returns {Promise<object>} Validation result
   */
  async validateQRCode(qrCode) {
    try {
      // Call the database service to validate the ticket
      const result = await db.validateTicket(qrCode);
      return result;
    } catch (error) {
      console.error('Error validating QR code:', error);
      throw new Error('Failed to validate QR code');
    }
  }
  
  /**
   * Generate a secure token for QR code
   * @param {string} orderId - Order ID
   * @param {string} ticketId - Ticket ID
   * @returns {string} Secure token
   */
  generateToken(orderId, ticketId) {
    // Combine order ID and ticket ID with a timestamp for uniqueness
    const data = `${orderId}:${ticketId}:${Date.now()}`;
    
    // Create a hash of the data for security
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    
    // Return a shortened version of the hash for QR code readability
    return hash.substring(0, 32);
  }
}

module.exports = new QRService();
