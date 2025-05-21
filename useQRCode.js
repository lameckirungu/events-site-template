/**
 * useQRCode.js
 * Custom hook for handling QR code operations
 */

import { useState } from 'react';
import apiConfig from '../config/api';

const useQRCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  /**
   * Validate a QR code
   * @param {string} qrCode - QR code to validate
   * @returns {Promise<object>} Validation result
   */
  const validateQRCode = async (qrCode) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.qr.validate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate QR code');
      }
      
      setValidationResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      return { error: err.message, valid: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validationResult,
    validateQRCode,
  };
};

export default useQRCode;
