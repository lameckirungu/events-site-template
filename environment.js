/**
 * Environment configuration
 * This file centralizes all environment variables and provides defaults
 * Customize these values for different deployments
 */

require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co',
    key: process.env.SUPABASE_KEY || 'your-supabase-key',
  },
  
  // M-Pesa configuration
  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY || 'your-mpesa-consumer-key',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'your-mpesa-consumer-secret',
    passkey: process.env.MPESA_PASSKEY || 'your-mpesa-passkey',
    shortcode: process.env.MPESA_SHORTCODE || 'your-mpesa-shortcode',
    callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://your-callback-url.com/api/payments/callback',
    baseUrl: process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke',
  },
  
  // SendGrid configuration
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || 'your-sendgrid-api-key',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourfestival.com',
    fromName: process.env.SENDGRID_FROM_NAME || 'Your Festival Name',
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT_MAX || 5, // 5 requests per minute
  },
  
  // Google Maps
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || 'your-google-maps-api-key',
  },
  
  // Event configuration - can be moved to database for dynamic configuration
  event: {
    name: process.env.EVENT_NAME || 'Music Festival',
    date: process.env.EVENT_DATE || '2025-06-15',
    venue: process.env.EVENT_VENUE || 'Central Park',
    address: process.env.EVENT_ADDRESS || '123 Main St, City, Country',
    coordinates: {
      lat: process.env.EVENT_LAT || -1.2921,
      lng: process.env.EVENT_LNG || 36.8219,
    },
  }
};
