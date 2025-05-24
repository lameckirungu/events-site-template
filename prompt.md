Feature: MusicFestivalTicketing

What:
  - "Provide mobile-first event website for musician's festival"
  - "Enable M-Pesa based ticket purchasing with QR code delivery"
  - "Display venue info with Google Maps integration"
  - "Show lineup/program, past event media, and artist bio"
  - "Generate scannable unique QR codes for ticket verification"
  - "Deliver ticket receipt and QR code via email using SendGrid"
  - "Enable staff-side QR validation through web-based scanner"

Boundaries:
  - "Frontend must be responsive and optimized for mobile-first using React + Tailwind"
  - "Backend must use Node.js with Express, and Supabase for DB"
  - "Payment must be exclusively via M-Pesa (Daraja API integration)"
  - "QR codes must be unique per order, encoded with `order_id` or hashed token"
  - "QR code delivery must be automated post-payment confirmation"
  - "Email must include ticket details + attached QR image using SendGrid"
  - "Google Maps integration must provide primary button for directions, plus nearby accommodations"
  - "Venue/map info must display at bottom of page"
  - "Staff must access QR scanner via PWA-compatible web page using html5-qrcode"
  - "Scanner must call secure backend endpoint that validates and marks QR code as used"
  - "QR verification response must return within 500ms"
  - "Image/video gallery must support swipeable media slider or grid layout"
  - "Contact form must support email, phone, and social links"
  - "Ticket orders and QR scans must persist and be queryable from Supabase"

Success:
  - "User can navigate and buy ticket from mobile without errors"
  - "M-Pesa payment completes and triggers QR email"
  - "User receives email with correct event info and scannable QR"
  - "QR code works when displayed on phone or printed"
  - "Staff scanner page validates code, blocks reused/invalid entries"
  - "Venue location loads map and directions link without delay"
  - "Gallery renders media without layout breakage"
  - "System scales to 500 concurrent check-ins"
  - "Site deploys and runs on Vercel without cold start latency"

Technical:
  framework: "React (frontend), Node.js + Express (backend)"
  database: "Supabase (PostgreSQL)"
  email: "SendGrid"
  payment: "Safaricom M-Pesa Daraja API"
  hosting: "Vercel"
  maps: "Google Maps Embed + Directions URL"
  qr: "qrcode npm package"
  scanner: "html5-qrcode JavaScript library"

Security:
  auth: "JWT for internal API endpoints"
  rate_limits: "Staff scanner endpoint limited to 5 req/sec per IP"
  monitoring: "Use Vercel Insights + Supabase logs"

Flow:
  - name: "PurchaseFlow"
    entry_point: true
    steps:
      - "User selects ticket"
      - "Initiates M-Pesa STK Push"
      - "On confirmation, save order in Supabase"
      - "Generate QR code linked to order"
      - "Send QR and receipt via email"
    next:
      success: "TicketDelivered"
      failure: "PaymentFailed"

  - name: "QRValidationFlow"
    entry_point: false
    steps:
      - "Scanner submits QR token"
      - "Lookup order in Supabase"
      - "If valid and unused, mark used and allow entry"
      - "Else, deny entry"
    next:
      success: "AllowEntry"
      failure: "DenyEntry"
