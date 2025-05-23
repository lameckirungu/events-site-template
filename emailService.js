/**
 * Email service
 * This file provides an interface for email operations using SendGrid
 * Can be replaced with other email providers by implementing the same interface
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = require('../config/environment');

class EmailService {
  constructor() {
    // In a production environment, use SendGrid transport
    // For development, we'll use a preview setup that logs to console
    if (config.nodeEnv === 'production') {
      this.transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: config.sendgrid.apiKey,
        },
      });
    } else {
      // For development/testing - logs to console instead of sending
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'ethereal.user@ethereal.email',
          pass: 'ethereal.password',
        },
      });
    }
  }

  /**
   * Send ticket email with QR code
   * @param {string} to - Recipient email
   * @param {object} ticketData - Ticket information
   * @param {string} qrCodeImage - QR code image as base64 string
   * @returns {Promise<object>} Email send result
   */
  async sendTicket(to, ticketData, qrCodeImage) {
    try {
      // Read email template
      let template = await this.getEmailTemplate('ticket.html');
      
      // Replace placeholders with actual data
      template = template
        .replace('{{EVENT_NAME}}', config.event.name)
        .replace('{{EVENT_DATE}}', new Date(config.event.date).toLocaleDateString())
        .replace('{{EVENT_VENUE}}', config.event.venue)
        .replace('{{TICKET_TYPE}}', ticketData.ticketType)
        .replace('{{CUSTOMER_NAME}}', ticketData.customerName)
        .replace('{{ORDER_ID}}', ticketData.orderId)
        .replace('{{QR_CODE}}', qrCodeImage);
      
      // Send email
      const result = await this.transporter.sendMail({
        from: `"${config.sendgrid.fromName}" <${config.sendgrid.fromEmail}>`,
        to,
        subject: `Your Ticket for ${config.event.name}`,
        html: template,
        attachments: [
          {
            filename: 'ticket-qr.png',
            content: qrCodeImage.split('base64,')[1],
            encoding: 'base64',
          },
        ],
      });
      
      return result;
    } catch (error) {
      console.error('Error sending ticket email:', error);
      throw new Error('Failed to send ticket email');
    }
  }
  
  /**
   * Send receipt email
   * @param {string} to - Recipient email
   * @param {object} orderData - Order information
   * @returns {Promise<object>} Email send result
   */
  async sendReceipt(to, orderData) {
    try {
      // Read email template
      let template = await this.getEmailTemplate('receipt.html');
      
      // Replace placeholders with actual data
      template = template
        .replace('{{EVENT_NAME}}', config.event.name)
        .replace('{{ORDER_ID}}', orderData.id)
        .replace('{{CUSTOMER_NAME}}', orderData.customerName)
        .replace('{{AMOUNT}}', orderData.amount)
        .replace('{{CURRENCY}}', orderData.currency)
        .replace('{{DATE}}', new Date(orderData.createdAt).toLocaleDateString())
        .replace('{{PAYMENT_METHOD}}', 'M-Pesa')
        .replace('{{PAYMENT_REFERENCE}}', orderData.paymentReference);
      
      // Send email
      const result = await this.transporter.sendMail({
        from: `"${config.sendgrid.fromName}" <${config.sendgrid.fromEmail}>`,
        to,
        subject: `Receipt for ${config.event.name}`,
        html: template,
      });
      
      return result;
    } catch (error) {
      console.error('Error sending receipt email:', error);
      throw new Error('Failed to send receipt email');
    }
  }
  
  /**
   * Get email template from file
   * @param {string} templateName - Template file name
   * @returns {Promise<string>} Template HTML
   */
  async getEmailTemplate(templateName) {
    try {
      const templatePath = path.join(__dirname, '../../templates/emails', templateName);
      return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      console.error('Error reading email template:', error);
      // Return a basic template if file not found
      return `
        <html>
          <body>
            <h1>{{EVENT_NAME}}</h1>
            <p>Thank you for your purchase!</p>
            <!-- Other placeholders will be replaced -->
          </body>
        </html>
      `;
    }
  }
}

module.exports = new EmailService();
