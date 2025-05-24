# Music Festival Ticketing Web App Template

A highly customizable and reusable template for event ticketing websites, designed for music festivals, pub gigs, lounge events, and other similar gatherings.

## Features

- **Mobile-first design** optimized for all devices
- **M-Pesa payment integration** with QR code ticket delivery
- **Google Maps integration** for venue information
- **Event lineup/program display** with artist information
- **Media gallery** for past event photos and videos
- **QR code generation and validation** for ticket verification
- **Email delivery** of tickets and receipts via SendGrid
- **Staff-side QR validation** through web-based scanner

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Context API for state management
- Custom hooks for business logic

### Backend
- Node.js with Express
- Supabase (PostgreSQL) for database
- JWT for API authentication
- QR code generation and validation
- Email integration with SendGrid

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- Supabase account
- M-Pesa Daraja API credentials (for production)
- SendGrid account (for production)
- Google Maps API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/lameckirungu/event-site-template.git
cd event-site-template
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend/my-festival-app
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory based on `.env.example`
   - Create a `.env` file in the frontend directory based on `.env.example`

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend/my-festival-app
npm run dev
```

## Customization Guide

The template is designed to be easily customizable for different events. Here's how to adapt it for your needs:

### Event Configuration

Edit the event configuration file at `frontend/my-festival-app/src/config/event.js` to update:

- Event name, date, and description
- Venue information and map coordinates
- Ticket types and pricing
- Artist lineup and schedule
- Gallery media
- FAQs and contact information

Example:
```javascript
const eventConfig = {
  name: "Your Event Name",
  tagline: "Your Event Tagline",
  startDate: "2025-08-15T10:00:00Z",
  // ... other configuration
};
```

### Theme Customization

Edit the theme configuration file at `frontend/my-festival-app/src/config/theme.js` to update:

- Color scheme
- Typography
- Component styles
- Spacing and layout

Example:
```javascript
const themeConfig = {
  colors: {
    primary: {
      light: '#5b21b6',
      DEFAULT: '#4c1d95',
      dark: '#3b0764',
    },
    // ... other color configurations
  },
  // ... other theme settings
};
```

### Backend Configuration

1. **Environment Variables**: Update the `.env` file in the backend directory with your service credentials:
   - Supabase URL and key
   - M-Pesa API credentials
   - SendGrid API key
   - JWT secret

2. **Email Templates**: Customize email templates in `backend/templates/emails/`:
   - `ticket.html` - Ticket email template
   - `receipt.html` - Receipt email template

## API Documentation

### Event Endpoints

- `GET /api/events/:id?` - Get event details
- `GET /api/events/:id/tickets` - Get ticket types for an event
- `GET /api/events/:id/artists` - Get artists/lineup for an event
- `GET /api/events/:id/gallery` - Get gallery media for an event

### Ticket Endpoints

- `GET /api/tickets/:ticketId` - Get ticket information
- `GET /api/tickets/order/:orderId` - Get tickets for an order

### Payment Endpoints

- `POST /api/payments/initiate` - Initiate payment process
- `POST /api/payments/callback` - M-Pesa callback endpoint
- `GET /api/payments/status/:orderId` - Check payment status

### QR Code Endpoints

- `POST /api/qr/validate` - Validate QR code
- `POST /api/qr/generate-test` - Generate test QR code (development only)

## Deployment

### Backend Deployment

1. Ensure all environment variables are set
2. Build the application:
```bash
cd backend
npm run build
```
3. Deploy to your preferred hosting service (Vercel recommended)

### Frontend Deployment

1. Update the API base URL in `frontend/my-festival-app/src/config/api.js`
2. Build the application:
```bash
cd frontend/my-festival-app
npm run build
```
3. Deploy the build folder to your preferred hosting service (Vercel recommended)

## Adapting for Different Event Types

### Music Festival
- Use multiple ticket types
- Configure multiple artists and stages
- Set up a multi-day schedule
- Include a rich media gallery

### Pub Gig
- Simplify to single ticket type
- Focus on featured performers
- Include food and drink menu information
- Emphasize venue information

### Corporate Event
- Rename "tickets" to "registrations"
- Replace "artists" with "speakers"
- Configure sessions instead of performances
- Adjust styling for professional appearance

## Troubleshooting

### Common Issues

1. **Payment Integration Issues**
   - Verify M-Pesa API credentials
   - Check callback URL configuration
   - Ensure proper error handling

2. **Email Delivery Problems**
   - Verify SendGrid API key
   - Check email templates for syntax errors
   - Test with development mode first

3. **QR Code Scanning Issues**
   - Ensure adequate lighting for scanning
   - Check camera permissions
   - Verify backend validation endpoint

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the styling framework
- Supabase for the database solution
- M-Pesa for the payment integration
- SendGrid for the email delivery service

---

*Built by [Lameck Irungu](https://github.com/lameckirungu)* 
*Contact: mugolameck@gmail.com*