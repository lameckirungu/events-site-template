/**
 * usePayment.js
 * Custom hook for handling payment operations
 */

import { useState } from 'react';
import apiConfig, { formatEndpoint } from '../config/api';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  /**
   * Initiate payment process
   * @param {object} paymentData - Payment information
   * @returns {Promise<object>} Payment initiation result
   */
  const initiatePayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.payments.initiate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate payment');
      }
      
      setOrderId(data.orderId);
      setPaymentStatus('pending');
      
      return data;
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Check payment status
   * @param {string} orderIdToCheck - Order ID to check status for
   * @returns {Promise<object>} Payment status result
   */
  const checkPaymentStatus = async (orderIdToCheck) => {
    const idToCheck = orderIdToCheck || orderId;
    
    if (!idToCheck) {
      setError('No order ID provided');
      return { error: 'No order ID provided' };
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = formatEndpoint(apiConfig.endpoints.payments.status, { orderId: idToCheck });
      const response = await fetch(`${apiConfig.baseUrl}${endpoint}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to check payment status');
      }
      
      setPaymentStatus(data.status);
      
      return data;
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Poll payment status at regular intervals
   * @param {string} orderIdToCheck - Order ID to check status for
   * @param {number} intervalMs - Polling interval in milliseconds
   * @param {number} maxAttempts - Maximum number of polling attempts
   * @returns {Promise<object>} Final payment status
   */
  const pollPaymentStatus = async (orderIdToCheck, intervalMs = 3000, maxAttempts = 10) => {
    const idToCheck = orderIdToCheck || orderId;
    
    if (!idToCheck) {
      setError('No order ID provided');
      return { error: 'No order ID provided' };
    }
    
    let attempts = 0;
    
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const result = await checkPaymentStatus(idToCheck);
          
          if (result.status === 'paid') {
            resolve(result);
            return;
          }
          
          attempts++;
          
          if (attempts >= maxAttempts) {
            resolve(result); // Resolve with current status after max attempts
            return;
          }
          
          setTimeout(poll, intervalMs);
        } catch (err) {
          reject(err);
        }
      };
      
      poll();
    });
  };
  
  return {
    loading,
    error,
    paymentStatus,
    orderId,
    initiatePayment,
    checkPaymentStatus,
    pollPaymentStatus,
  };
};

export default usePayment;
