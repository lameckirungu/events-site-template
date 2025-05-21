/**
 * API configuration
 * This file centralizes all API endpoint configurations for easy customization
 */

const apiConfig = {
  // Base URL for API requests
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  
  // Endpoints
  endpoints: {
    // Event information
    event: {
      details: '/events',
      tickets: '/events/:id/tickets',
      artists: '/events/:id/artists',
      gallery: '/events/:id/gallery',
    },
    
    // Ticket operations
    tickets: {
      get: '/tickets/:ticketId',
      byOrder: '/tickets/order/:orderId',
    },
    
    // Payment operations
    payments: {
      initiate: '/payments/initiate',
      status: '/payments/status/:orderId',
    },
    
    // QR code operations
    qr: {
      validate: '/qr/validate',
    },
  },
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Headers to include in all requests
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Helper function to replace path parameters in endpoints
 * @param {string} endpoint - Endpoint with path parameters
 * @param {object} params - Object containing parameter values
 * @returns {string} Endpoint with replaced parameters
 */
export const formatEndpoint = (endpoint, params = {}) => {
  let formattedEndpoint = endpoint;
  
  Object.keys(params).forEach(key => {
    formattedEndpoint = formattedEndpoint.replace(`:${key}`, params[key]);
  });
  
  return formattedEndpoint;
};

export default apiConfig;
