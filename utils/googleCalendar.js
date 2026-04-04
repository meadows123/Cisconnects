import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

// Parse credentials from environment variable
const getAuthClient = () => {
  try {
    let credentialsJson = process.env.GOOGLE_CREDENTIALS_B64 || process.env.GOOGLE_CREDENTIALS;
    if (!credentialsJson) {
      console.warn('GOOGLE_CREDENTIALS not found in environment variables');
      return null;
    }

    // If using base64 encoding, decode it
    if (process.env.GOOGLE_CREDENTIALS_B64) {
      credentialsJson = Buffer.from(credentialsJson, 'base64').toString('utf8');
    }

    console.log('GOOGLE_CREDENTIALS length:', credentialsJson.length);

    const credentials = JSON.parse(credentialsJson);
    console.log('Parsed credentials - type:', credentials.type, 'client_email:', credentials.client_email);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    return auth;
  } catch (error) {
    console.error('Error initializing Google Auth:', error.message);
    console.error('Full error:', error);
    return null;
  }
};

// Create a calendar event from booking data
export const createCalendarEvent = async (bookingData) => {
  try {
    const auth = getAuthClient();
    if (!auth) {
      console.warn('Google Calendar not configured - skipping event creation');
      return null;
    }

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'zak.meadows15@gmail.com';

    // Parse date and time - treating as Europe/London time
    const [year, month, day] = bookingData.date.split('-').map(Number);
    const [hours, minutes] = bookingData.time ? bookingData.time.split(':').map(Number) : [9, 0];

    // Create date in Europe/London timezone (not UTC)
    const startTime = new Date(year, month - 1, day, hours, minutes, 0);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // 1 hour duration

    // Format times as RFC 3339
    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      const secs = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${mins}:${secs}`;
    };

    const event = {
      summary: `Booking: ${bookingData.name}`,
      description: `
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
${bookingData.company ? `Company: ${bookingData.company}` : ''}
${bookingData.reason ? `Reason: ${bookingData.reason}` : ''}
${bookingData.comments ? `Comments: ${bookingData.comments}` : ''}
      `.trim(),
      start: {
        dateTime: formatDateTime(startTime),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: formatDateTime(endTime),
        timeZone: 'Europe/London',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 0 },    // Email at time of event
          { method: 'notification', minutes: 15 }  // Desktop notification 15 min before
        ]
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    console.log('Calendar event created:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error.message);
    // Don't throw - allow booking to succeed even if calendar fails
    return null;
  }
};

// Create event for call requests (scheduling calls)
export const createCallEvent = async (callData) => {
  try {
    const auth = getAuthClient();
    if (!auth) {
      console.warn('Google Calendar not configured - skipping event creation');
      return null;
    }

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'zak.meadows15@gmail.com';

    // Create event for tomorrow at 2 PM as a default catch-up time
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 1);
    eventDate.setHours(14, 0, 0, 0);

    const endTime = new Date(eventDate);
    endTime.setHours(endTime.getHours() + 0.5); // 30 min call

    // Format times as RFC 3339
    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      const secs = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${mins}:${secs}`;
    };

    const event = {
      summary: `Call Request: ${callData.name}`,
      description: `
Name: ${callData.name}
Email: ${callData.email}
Phone: ${callData.phone}
Call Request Date: ${new Date(callData.createdAt).toLocaleString()}
      `.trim(),
      start: {
        dateTime: formatDateTime(eventDate),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: formatDateTime(endTime),
        timeZone: 'Europe/London',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 0 },    // Email at time of event
          { method: 'notification', minutes: 15 }  // Desktop notification 15 min before
        ]
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    console.log('Call event created in calendar:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error creating call event:', error.message);
    return null;
  }
};

export default {
  createCalendarEvent,
  createCallEvent,
};
