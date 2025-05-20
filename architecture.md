# Music Festival Ticketing Web App - Architecture Design

## Overview

This document outlines the architecture for a reusable music festival ticketing web application template. The architecture is designed to be modular, extensible, and easily customizable for various event types including music festivals, pub gigs, lounge events, and other similar gatherings.

## System Architecture

The application follows a client-server architecture with the following components:

1. **Frontend**: React with Tailwind CSS (Mobile-first)
2. **Backend**: Node.js with Express
3. **Database**: Supabase (PostgreSQL)
4. **Integrations**:
   - Payment: M-Pesa Daraja API
   - Email: SendGrid
   - Maps: Google Maps
   - QR Code: qrcode npm package
   - QR Scanner: html5-qrcode

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend (Vercel)                    │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Pages    │  │  Components │  │      Theme Config       │  │
│  │ (Customizable) │ (Reusable)  │  │ (Colors, Fonts, Styles) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Layouts   │  │    Hooks    │  │     Event Config        │  │
│  │ (Adaptable) │  │ (Utility)   │  │ (Customization Point)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Node.js Backend (Vercel)                      │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Routes   │  │  Controllers│  │       Services          │  │
│  │ (API Endpoints)│ (Logic)     │  │ (Business Logic)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Middleware │  │    Utils    │  │     Config Manager      │  │
│  │ (Auth, etc) │  │ (Helpers)   │  │ (Environment Variables) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Integrations                       │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Supabase  │  │   M-Pesa    │  │       SendGrid          │  │
│  │ (Database)  │  │ (Payments)  │  │ (Email Notifications)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │ Google Maps │  │  QR Code    │                               │
│  │ (Location)  │  │ Generation  │                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Directory Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── default-images/  # Default images that can be replaced
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components
│   │   └── event-specific/  # Components specific to event type
│   ├── config/
│   │   ├── event.js         # Event configuration (main customization point)
│   │   ├── theme.js         # Theme configuration
│   │   └── api.js           # API endpoints configuration
│   ├── contexts/
│   │   ├── EventContext.js  # Event data provider
│   │   └── AuthContext.js   # Authentication context
│   ├── hooks/
│   │   ├── useTicket.js     # Ticket management hook
│   │   ├── usePayment.js    # Payment processing hook
│   │   └── useQRCode.js     # QR code generation hook
│   ├── pages/
│   │   ├── Home.js          # Landing page
│   │   ├── Tickets.js       # Ticket selection page
│   │   ├── Checkout.js      # Payment page
│   │   ├── Confirmation.js  # Post-payment confirmation
│   │   ├── Lineup.js        # Event lineup/program
│   │   ├── Gallery.js       # Media gallery
│   │   ├── Venue.js         # Venue information with map
│   │   ├── Contact.js       # Contact information
│   │   └── staff/
│   │       └── Scanner.js   # QR code scanner for staff
│   ├── services/
│   │   ├── api.js           # API service
│   │   └── storage.js       # Local storage service
│   ├── styles/
│   │   ├── tailwind.css     # Tailwind configuration
│   │   └── custom.css       # Custom styles
│   ├── utils/
│   │   ├── formatters.js    # Data formatting utilities
│   │   └── validators.js    # Input validation utilities
│   ├── App.js               # Main application component
│   └── index.js             # Entry point
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies and scripts
```

### Customization Points (Frontend)

1. **Event Configuration (`src/config/event.js`)**
   - Event details (name, date, location)
   - Ticket types and pricing
   - Lineup/program information
   - Gallery media
   - Contact information
   - Social media links
   - Map coordinates

2. **Theme Configuration (`src/config/theme.js`)**
   - Color scheme
   - Typography
   - Button styles
   - Card styles
   - Custom CSS variables

3. **Assets (`public/assets/`)**
   - Logo
   - Hero images
   - Background images
   - Artist photos

## Backend Architecture

### Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Supabase configuration
│   │   ├── payment.js       # M-Pesa configuration
│   │   ├── email.js         # SendGrid configuration
│   │   └── environment.js   # Environment variables
│   ├── controllers/
│   │   ├── ticketController.js    # Ticket management
│   │   ├── paymentController.js   # Payment processing
│   │   ├── qrController.js        # QR code operations
│   │   └── eventController.js     # Event information
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   ├── validation.js    # Input validation
│   │   └── rateLimit.js     # Rate limiting
│   ├── models/
│   │   ├── ticket.js        # Ticket data model
│   │   ├── order.js         # Order data model
│   │   ├── event.js         # Event data model
│   │   └── user.js          # User data model
│   ├── routes/
│   │   ├── ticketRoutes.js  # Ticket endpoints
│   │   ├── paymentRoutes.js # Payment endpoints
│   │   ├── qrRoutes.js      # QR code endpoints
│   │   ├── eventRoutes.js   # Event information endpoints
│   │   └── index.js         # Route aggregator
│   ├── services/
│   │   ├── supabaseService.js    # Database operations
│   │   ├── mpesaService.js       # M-Pesa integration
│   │   ├── emailService.js       # SendGrid integration
│   │   ├── qrService.js          # QR code generation
│   │   └── templateService.js    # Email template rendering
│   ├── utils/
│   │   ├── logger.js        # Logging utility
│   │   ├── errorHandler.js  # Error handling
│   │   └── formatters.js    # Data formatting
│   ├── app.js              # Express application setup
│   └── server.js           # Server entry point
├── templates/
│   └── emails/
│       ├── ticket.html     # Ticket email template
│       └── receipt.html    # Receipt email template
└── package.json           # Dependencies and scripts
```

### Customization Points (Backend)

1. **Environment Configuration**
   - API keys and secrets
   - Service endpoints
   - Database connection

2. **Email Templates (`templates/emails/`)**
   - Ticket email design
   - Receipt email design

3. **Event Configuration**
   - Event details stored in database
   - Ticket types and pricing
   - Staff access credentials

## Database Schema (Supabase)

### Tables

1. **events**
   - id (UUID, primary key)
   - name (text)
   - description (text)
   - start_date (timestamp)
   - end_date (timestamp)
   - venue_name (text)
   - venue_address (text)
   - venue_coordinates (json: {lat, lng})
   - banner_image (text, URL)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **ticket_types**
   - id (UUID, primary key)
   - event_id (UUID, foreign key)
   - name (text)
   - description (text)
   - price (numeric)
   - currency (text)
   - quantity_available (integer)
   - quantity_sold (integer)
   - is_active (boolean)
   - created_at (timestamp)
   - updated_at (timestamp)

3. **orders**
   - id (UUID, primary key)
   - customer_name (text)
   - customer_email (text)
   - customer_phone (text)
   - total_amount (numeric)
   - currency (text)
   - status (text: 'pending', 'paid', 'cancelled')
   - payment_reference (text)
   - created_at (timestamp)
   - updated_at (timestamp)

4. **tickets**
   - id (UUID, primary key)
   - order_id (UUID, foreign key)
   - ticket_type_id (UUID, foreign key)
   - qr_code (text)
   - is_used (boolean)
   - used_at (timestamp)
   - created_at (timestamp)
   - updated_at (timestamp)

5. **artists**
   - id (UUID, primary key)
   - event_id (UUID, foreign key)
   - name (text)
   - bio (text)
   - image (text, URL)
   - performance_time (timestamp)
   - created_at (timestamp)
   - updated_at (timestamp)

6. **gallery**
   - id (UUID, primary key)
   - event_id (UUID, foreign key)
   - media_type (text: 'image', 'video')
   - url (text)
   - thumbnail (text)
   - title (text)
   - description (text)
   - created_at (timestamp)
   - updated_at (timestamp)

7. **staff**
   - id (UUID, primary key)
   - event_id (UUID, foreign key)
   - name (text)
   - email (text)
   - role (text)
   - created_at (timestamp)
   - updated_at (timestamp)

## Integration Interfaces

### 1. Payment Integration (M-Pesa)

```javascript
// services/mpesaService.js
class MpesaService {
  constructor(config) {
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.baseUrl = config.baseUrl;
    this.callbackUrl = config.callbackUrl;
  }

  async initiateSTKPush(phoneNumber, amount, reference) {
    // Implementation for STK push
  }

  async checkTransactionStatus(transactionId) {
    // Implementation for checking transaction status
  }
}

// Easily replaceable with other payment providers
```

### 2. Email Integration (SendGrid)

```javascript
// services/emailService.js
class EmailService {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async sendTicket(recipient, ticketData, qrCodeUrl) {
    // Implementation for sending ticket email
  }

  async sendReceipt(recipient, orderData) {
    // Implementation for sending receipt email
  }
}

// Easily replaceable with other email providers
```

### 3. QR Code Integration

```javascript
// services/qrService.js
class QRService {
  generateQRCode(data) {
    // Implementation for generating QR code
  }

  validateQRCode(qrData) {
    // Implementation for validating QR code
  }
}
```

### 4. Google Maps Integration

```javascript
// Frontend integration in Venue.js component
const VenueMap = ({ coordinates, apiKey }) => {
  // Implementation for Google Maps integration
};
```

## Application Flows

### 1. Ticket Purchase Flow

1. User selects ticket type
2. User enters personal information
3. User initiates M-Pesa payment
4. System receives payment confirmation
5. System generates QR code
6. System sends ticket with QR code via email
7. User receives confirmation on website

### 2. QR Code Validation Flow

1. Staff accesses scanner page
2. Staff scans attendee's QR code
3. System validates QR code against database
4. System returns validation result
5. Staff allows or denies entry based on result

## Customization Guide

To adapt this template for different events:

1. **Event Details**: Update `src/config/event.js` with new event information
2. **Theme**: Modify `src/config/theme.js` to match event branding
3. **Assets**: Replace images in `public/assets/` with event-specific media
4. **Database**: Populate Supabase tables with event-specific data
5. **Email Templates**: Customize email designs in `templates/emails/`
6. **Environment Variables**: Update API keys and endpoints as needed

## Deployment Strategy

1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy to Vercel as serverless functions
3. **Database**: Use Supabase cloud instance
4. **Environment Variables**: Configure in Vercel project settings

## Security Considerations

1. **Authentication**: JWT for internal API endpoints
2. **Rate Limiting**: Staff scanner endpoint limited to 5 req/sec per IP
3. **Data Protection**: Secure storage of payment and personal information
4. **QR Code Security**: Unique, one-time use codes with server-side validation
5. **API Security**: CORS configuration and input validation

## Performance Optimization

1. **Code Splitting**: Implement React lazy loading for route-based code splitting
2. **Image Optimization**: Use responsive images and lazy loading
3. **Caching**: Implement appropriate caching strategies
4. **Database Indexing**: Create indexes for frequently queried fields
5. **API Response Time**: Optimize for sub-500ms response times for QR validation

This architecture provides a solid foundation for a reusable event ticketing template that can be easily customized for various types of events while maintaining core functionality and performance requirements.
