/**
 * M-Pesa payment service
 * This file provides an interface for M-Pesa payment operations
 * Can be replaced with other payment providers by implementing the same interface
 */

const axios = require('axios');
const config = require('../config/environment');

class MpesaService {
  constructor() {
    this.consumerKey = config.mpesa.consumerKey;
    this.consumerSecret = config.mpesa.consumerSecret;
    this.baseUrl = config.mpesa.baseUrl;
    this.passkey = config.mpesa.passkey;
    this.shortcode = config.mpesa.shortcode;
    this.callbackUrl = config.mpesa.callbackUrl;
  }

  /**
   * Get OAuth token for M-Pesa API
   * @returns {Promise<string>} Access token
   */
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      const response = await axios.get(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  /**
   * Initiate STK Push to customer's phone
   * @param {string} phoneNumber - Customer's phone number (format: 254XXXXXXXXX)
   * @param {number} amount - Amount to charge
   * @param {string} reference - Payment reference/order ID
   * @returns {Promise<object>} STK push response
   */
  async initiateSTKPush(phoneNumber, amount, reference) {
    try {
      const token = await this.getAccessToken();
      const timestamp = this.getTimestamp();
      const password = Buffer.from(
        `${this.shortcode}${this.passkey}${timestamp}`
      ).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: this.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: this.shortcode,
          PhoneNumber: phoneNumber,
          CallBackURL: this.callbackUrl,
          AccountReference: reference,
          TransactionDesc: `Payment for ${reference}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw new Error('Failed to initiate payment');
    }
  }

  /**
   * Check transaction status
   * @param {string} transactionId - M-Pesa transaction ID
   * @returns {Promise<object>} Transaction status
   */
  async checkTransactionStatus(transactionId) {
    try {
      const token = await this.getAccessToken();
      const timestamp = this.getTimestamp();
      const password = Buffer.from(
        `${this.shortcode}${this.passkey}${timestamp}`
      ).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        {
          BusinessShortCode: this.shortcode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error checking transaction status:', error);
      throw new Error('Failed to check transaction status');
    }
  }

  /**
   * Get current timestamp in the format required by M-Pesa
   * @returns {string} Timestamp in format YYYYMMDDHHmmss
   */
  getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}

module.exports = new MpesaService();
