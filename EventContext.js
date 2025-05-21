/**
 * EventContext.js
 * Provides event data and state management for the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import eventConfig from '../config/event';
import apiConfig, { formatEndpoint } from '../config/api';

// Create context
const EventContext = createContext();

// Provider component
export const EventProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState(eventConfig);
  const [ticketTypes, setTicketTypes] = useState(eventConfig.tickets);
  const [artists, setArtists] = useState(eventConfig.artists);
  const [gallery, setGallery] = useState(eventConfig.gallery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch event details from API if available
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        
        // Fetch event details
        const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.event.details}`);
        
        if (response.ok) {
          const data = await response.json();
          // Merge API data with config data, with API taking precedence
          setEventDetails(prevDetails => ({
            ...prevDetails,
            ...data
          }));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details');
        setLoading(false);
        // Fall back to config data
      }
    };

    // Only fetch if we have an API URL configured
    if (apiConfig.baseUrl !== 'http://localhost:3001/api') {
      fetchEventData();
    }
  }, []);

  // Fetch ticket types if event ID is available
  useEffect(() => {
    const fetchTicketTypes = async () => {
      if (!eventDetails.id) return;
      
      try {
        setLoading(true);
        
        const endpoint = formatEndpoint(apiConfig.endpoints.event.tickets, { id: eventDetails.id });
        const response = await fetch(`${apiConfig.baseUrl}${endpoint}`);
        
        if (response.ok) {
          const data = await response.json();
          setTicketTypes(data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ticket types:', err);
        setLoading(false);
        // Fall back to config data
      }
    };

    // Only fetch if we have an API URL and event ID
    if (apiConfig.baseUrl !== 'http://localhost:3001/api' && eventDetails.id) {
      fetchTicketTypes();
    }
  }, [eventDetails.id]);

  // Value to be provided by the context
  const value = {
    eventDetails,
    ticketTypes,
    artists,
    gallery,
    loading,
    error
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the event context
export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export default EventContext;
