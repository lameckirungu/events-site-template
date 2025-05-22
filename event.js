/**
 * Frontend configuration for event details
 * This is the main customization point for event-specific information
 */

const eventConfig = {
  // Basic event information
  name: "Music Festival 2025",
  tagline: "Experience the rhythm of summer",
  description: "Join us for three days of amazing music, food, and fun in the heart of the city.",
  startDate: "2025-06-15T10:00:00Z",
  endDate: "2025-06-17T23:00:00Z",
  
  // Contact information
  contact: {
    email: "info@musicfestival2025.com",
    phone: "+254 700 123456",
    social: {
      facebook: "https://facebook.com/musicfestival2025",
      twitter: "https://twitter.com/musicfest2025",
      instagram: "https://instagram.com/musicfestival2025"
    }
  },
  
  // Venue information
  venue: {
    name: "Westgate Mall",
    address: "Westgate Mall, Nairobi, Kenya",
    coordinates: {
      lat: -1.2921,
      lng: 36.8219
    },
    mapZoom: 15,
    nearbyAccommodations: [
      {
        name: "Westgate Hotel",
        address: "Westgate Mall, Nairobi, Kenya",
        website: "https://westgatehotel.com",
        distance: "0.5 km"
      },
      {
        name: "Westgate Hotel",
        address: "Westgate Mall, Nairobi, Kenya",
        website: "https://westgatehotel.com",
        distance: "1.2 km"
      }
    ]
  },
  
  // Ticket types
  tickets: [
    {
      id: "regular",
      name: "Regular Pass",
      description: "Access to all general areas and performances",
      price: 2500,
      currency: "KES",
      available: true
    },
    {
      id: "vip",
      name: "VIP Pass",
      description: "Premium access with exclusive viewing areas and complimentary drinks",
      price: 5000,
      currency: "KES",
      available: true
    },
    {
      id: "weekend",
      name: "Weekend Pass",
      description: "Access for Saturday and Sunday only",
      price: 1800,
      currency: "KES",
      available: true
    }
  ],
  
  // Artists/lineup
  artists: [
    {
      name: "Khaligraph Jones",
      image: "/assets/artists/headliners.jpg",
      bio: "Award-winning band known for their energetic performances",
      performanceTime: "2025-06-15T20:00:00Z",
      stage: "Main Stage"
    },
    {
      name: "Sauti Sol",
      image: "/assets/artists/electric-sound.jpg",
      bio: "Electronic music duo pushing the boundaries of sound",
      performanceTime: "2025-06-16T19:00:00Z",
      stage: "Dance Pavilion"
    },
    {
      name: "Wizkid",
      image: "/assets/artists/acoustic-dreams.jpg",
      bio: "The best artist in the world",
      performanceTime: "2025-06-17T18:00:00Z",
      stage: "Main Stage"
    }
  ],
  
  // Schedule/program
  schedule: [
    {
      day: "Day 1",
      date: "2025-06-15",
      events: [
        {
          time: "10:00",
          name: "Gates Open",
          description: "Welcome to Music Festival 2025!"
        },
        {
          time: "12:00",
          name: "Local Talents",
          description: "Performances by emerging local artists",
          stage: "Garden Stage"
        },
        {
          time: "16:00",
          name: "DJ Session",
          description: "Get moving with our resident DJs",
          stage: "Main Stage"
        },
        {
          time: "20:00",
          name: "Khaligraph Jones",
          description: "Main performance of the day",
          stage: "Main Stage"
        }
      ]
    },
    {
      day: "Day 2",
      date: "2025-06-16",
      events: [
        {
          time: "10:00",
          name: "Gates Open",
          description: "Day 2 of Music Festival 2025"
        },
        {
          time: "13:00",
          name: "Sauti Sol",
          description: "Local bands compete for a prize",
          stage: "Main Stage"
        },
        {
          time: "19:00",
          name: "Wizkid",
          description: "The best artist in the world",
          stage: "Main Stage"
        }
      ]
    },
    {
      day: "Day 3",
      date: "2025-06-17",
      events: [
        {
          time: "10:00",
          name: "Gates Open",
          description: "Final day of Music Festival 2025"
        },
        {
          time: "14:00",
          name: "Family Hour",
          description: "Activities for all ages",
          stage: "Garden Stage"
        },
        {
          time: "18:00",
          name: "Wizkid",
          description: "The best artist in the world",
          stage: "Main Stage"
        },
        {
          time: "22:00",
          name: "Closing Ceremony",
          description: "Farewell until next year",
          stage: "Main Stage"
        }
      ]
    }
  ],
  
  // Gallery
  gallery: [
    {
      type: "image",
      url: "/assets/gallery/image1.jpg",
      thumbnail: "/assets/gallery/thumbnails/image1.jpg",
      title: "Last Year's Main Stage"
    },
    {
      type: "image",
      url: "/assets/gallery/image2.jpg",
      thumbnail: "/assets/gallery/thumbnails/image2.jpg",
      title: "Crowd Enjoying the Music"
    },
    {
      type: "video",
      url: "/assets/gallery/video1.mp4",
      thumbnail: "/assets/gallery/thumbnails/video1.jpg",
      title: "Highlights from 2024"
    }
  ],
  
  // Sponsors
  sponsors: [
    {
      name: "Major Sponsor",
      logo: "/assets/sponsors/major.png",
      website: "https://majorsponsor.com"
    },
    {
      name: "Supporting Company",
      logo: "/assets/sponsors/supporting.png",
      website: "https://supportingcompany.com"
    }
  ],
  
  // FAQ
  faq: [
    {
      question: "What time do gates open?",
      answer: "Gates open at 10:00 AM each day of the festival."
    },
    {
      question: "Can I bring my own food and drinks?",
      answer: "Small snacks and sealed water bottles are allowed, but no outside alcohol or large coolers."
    },
    {
      question: "Is there parking available?",
      answer: "Limited parking is available near the venue. We recommend using public transportation or ride-sharing services."
    }
  ]
};

export default eventConfig;
