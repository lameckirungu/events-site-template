/**
 * Supabase database configuration
 * This file provides a centralized interface for database operations
 */

const { createClient } = require('@supabase/supabase-js');
const config = require('./environment');

// Initialize Supabase client
const supabase = createClient(
  config.supabase.url,
  config.supabase.key
);

module.exports = {
  supabase,
  
  // Helper functions for common database operations
  async getEvent(eventId) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async getTicketTypes(eventId) {
    const { data, error } = await supabase
      .from('ticket_types')
      .select('*')
      .eq('event_id', eventId)
      .eq('is_active', true);
      
    if (error) throw error;
    return data;
  },
  
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async createTicket(ticketData) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async validateTicket(qrCode) {
    // First get the ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('qr_code', qrCode)
      .single();
      
    if (ticketError) throw ticketError;
    
    // Check if ticket is already used
    if (ticket.is_used) {
      return { valid: false, message: 'Ticket already used', ticket };
    }
    
    // Mark ticket as used
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq('id', ticket.id);
      
    if (updateError) throw updateError;
    
    return { valid: true, message: 'Ticket valid', ticket };
  },
  
  async getArtists(eventId) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('event_id', eventId);
      
    if (error) throw error;
    return data;
  },
  
  async getGallery(eventId) {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('event_id', eventId);
      
    if (error) throw error;
    return data;
  }
};
