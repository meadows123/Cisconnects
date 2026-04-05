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

    console.log('📅 createCalendarEvent called with:', JSON.stringify(bookingData));

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'zak.meadows15@gmail.com';

    // Parse date and time - build ISO string with timezone offset for UK
    // April is BST (UTC+1), but calculate offset dynamically to be safe
    const testDate = new Date(bookingData.date);
    const tzOffset = new Date(bookingData.date).toLocaleString('en-GB', { timeZone: 'Europe/London' });
    const jan = new Date(bookingData.date.split('-')[0], 0, 1);
    const july = new Date(bookingData.date.split('-')[0], 6, 1);
    const winterOffset = jan.getTimezoneOffset();
    const summerOffset = july.getTimezoneOffset();
    const isDST = testDate.getTimezoneOffset() < Math.max(winterOffset, summerOffset);
    const offset = isDST ? '+01:00' : '+00:00'; // BST is +01:00, GMT is +00:00

    const startTimeStr = `${bookingData.date}T${bookingData.time}:00${offset}`;

    // For end time, add 1 hour
    const [hours, minutes] = bookingData.time.split(':').map(Number);
    const endHours = String((hours + 1) % 24).padStart(2, '0');
    const endTimeStr = `${bookingData.date}T${endHours}:${bookingData.time.split(':')[1]}:00${offset}`;

    console.log('📅 createCalendarEvent called with:', JSON.stringify({
      date: bookingData.date,
      time: bookingData.time,
      startTimeStr,
      endTimeStr,
      isDST,
      offset
    }));

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
        dateTime: startTimeStr,
      },
      end: {
        dateTime: endTimeStr,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 0 },
          { method: 'notification', minutes: 15 }
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
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Google API error details:', JSON.stringify(error.response.data.error, null, 2));
    }
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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowStr = `${String(tomorrow.getFullYear())}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

    // Calculate UK timezone offset (BST +01:00 or GMT +00:00)
    const jan = new Date(tomorrow.getFullYear(), 0, 1);
    const july = new Date(tomorrow.getFullYear(), 6, 1);
    const winterOffset = jan.getTimezoneOffset();
    const summerOffset = july.getTimezoneOffset();
    const isDST = tomorrow.getTimezoneOffset() < Math.max(winterOffset, summerOffset);
    const offset = isDST ? '+01:00' : '+00:00';

    const callStartStr = `${tomorrowStr}T14:00:00${offset}`;
    const callEndStr = `${tomorrowStr}T14:30:00${offset}`;

    const event = {
      summary: `Call Request: ${callData.name}`,
      description: `
Name: ${callData.name}
Email: ${callData.email}
Phone: ${callData.phone}
Call Request Date: ${new Date(callData.createdAt).toLocaleString()}
      `.trim(),
      start: {
        dateTime: callStartStr,
      },
      end: {
        dateTime: callEndStr,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 0 },
          { method: 'notification', minutes: 15 }
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
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Google API error details:', JSON.stringify(error.response.data.error, null, 2));
    }
    return null;
  }
};

export default {
  createCalendarEvent,
  createCallEvent,
};
