/**
 * Payment controller
 * Handles requests related to payment processing
 */

const mpesaService = require('../services/mpesaService');
const qrService = require('../services/qrService');
const emailService = require('../services/emailService');
const db = require('../config/database');

class PaymentController {
  /**
   * Initiate payment process
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async initiatePayment(req, res, next) {
    try {
      const { phoneNumber, amount, customerName, customerEmail, ticketTypeId } = req.body;
      
      if (!phoneNumber || !amount || !customerName || !customerEmail || !ticketTypeId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Create order in pending state
      const order = await db.createOrder({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: phoneNumber,
        total_amount: amount,
        currency: 'KES', // This could be configurable
        status: 'pending',
        payment_reference: '',
      });
      
      // Initiate M-Pesa STK push
      const paymentResult = await mpesaService.initiateSTKPush(
        phoneNumber,
        amount,
        order.id
      );
      
      // Update order with payment reference
      await db.supabase
        .from('orders')
        .update({ payment_reference: paymentResult.CheckoutRequestID })
        .eq('id', order.id);
      
      res.json({
        success: true,
        orderId: order.id,
        checkoutRequestId: paymentResult.CheckoutRequestID,
        message: 'Payment initiated. Please complete on your phone.',
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Handle M-Pesa callback
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async mpesaCallback(req, res, next) {
    try {
      const { Body } = req.body;
      
      // Ensure we have the required data
      if (!Body || !Body.stkCallback) {
        return res.status(400).json({ error: 'Invalid callback data' });
      }
      
      const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = Body.stkCallback;
      
      // Find the order by payment reference
      const { data: order, error } = await db.supabase
        .from('orders')
        .select('*')
        .eq('payment_reference', CheckoutRequestID)
        .single();
      
      if (error || !order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // If payment was successful
      if (ResultCode === 0) {
        // Extract payment details from callback metadata
        const metadata = {};
        CallbackMetadata.Item.forEach(item => {
          metadata[item.Name] = item.Value;
        });
        
        // Update order status
        await db.supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_reference: metadata.MpesaReceiptNumber || CheckoutRequestID,
          })
          .eq('id', order.id);
        
        // Create ticket
        const ticket = await db.createTicket({
          order_id: order.id,
          ticket_type_id: order.ticket_type_id,
          is_used: false,
        });
        
        // Generate QR code
        const { qrCode, qrImageBase64 } = await qrService.generateQRCode(order.id, ticket.id);
        
        // Update ticket with QR code
        await db.supabase
          .from('tickets')
          .update({ qr_code: qrCode })
          .eq('id', ticket.id);
        
        // Get ticket type details
        const { data: ticketType } = await db.supabase
          .from('ticket_types')
          .select('name')
          .eq('id', ticket.ticket_type_id)
          .single();
        
        // Send ticket email
        await emailService.sendTicket(order.customer_email, {
          ticketType: ticketType.name,
          customerName: order.customer_name,
          orderId: order.id,
        }, qrImageBase64);
        
        // Send receipt email
        await emailService.sendReceipt(order.customer_email, {
          id: order.id,
          customerName: order.customer_name,
          amount: order.total_amount,
          currency: order.currency,
          createdAt: order.created_at,
          paymentReference: metadata.MpesaReceiptNumber || CheckoutRequestID,
        });
      } else {
        // Payment failed
        await db.supabase
          .from('orders')
          .update({
            status: 'cancelled',
            payment_reference: CheckoutRequestID,
          })
          .eq('id', order.id);
      }
      
      // Respond to M-Pesa
      res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Check payment status
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  async checkPaymentStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }
      
      // Get order from database
      const { data: order, error } = await db.supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error || !order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // If order is still pending and has a payment reference, check status
      if (order.status === 'pending' && order.payment_reference) {
        try {
          const statusResult = await mpesaService.checkTransactionStatus(order.payment_reference);
          
          // Update order status based on result
          if (statusResult.ResultCode === 0) {
            await db.supabase
              .from('orders')
              .update({ status: 'paid' })
              .eq('id', order.id);
            
            order.status = 'paid';
          }
        } catch (mpesaError) {
          console.error('Error checking M-Pesa status:', mpesaError);
          // Continue with current order status
        }
      }
      
      res.json({
        orderId: order.id,
        status: order.status,
        paymentReference: order.payment_reference,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
