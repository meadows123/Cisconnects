import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

const getHeaders = () => {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.warn('GHL_API_KEY not found in environment variables');
    return null;
  }
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Version': GHL_API_VERSION,
  };
};

/**
 * Create or update a contact in GoHighLevel.
 * Returns the contact object on success, or null if GHL is not configured.
 */
export const createGHLContact = async (contactData) => {
  const headers = getHeaders();
  if (!headers) return null;

  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) {
    console.warn('GHL_LOCATION_ID not configured - skipping GHL contact creation');
    return null;
  }

  try {
    // Split name into first/last
    const nameParts = (contactData.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const body = {
      locationId,
      firstName,
      lastName,
      email: contactData.email || '',
      phone: contactData.phone || '',
      ...(contactData.company ? { companyName: contactData.company } : {}),
      tags: contactData.tags || ['website-lead'],
      source: contactData.source || 'website',
    };

    const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GHL contact creation failed (${response.status}):`, errorText);
      return null;
    }

    const data = await response.json();
    console.log('GHL contact created:', data.contact?.id);
    return data.contact || data;
  } catch (error) {
    console.error('Error creating GHL contact:', error.message);
    return null;
  }
};

/**
 * Create an appointment in GoHighLevel calendar.
 * Requires a contactId (obtained from createGHLContact).
 * Returns the appointment object on success, or null on failure.
 */
export const createGHLAppointment = async (appointmentData, contactId) => {
  const headers = getHeaders();
  if (!headers) return null;

  const locationId = process.env.GHL_LOCATION_ID;
  const calendarId = process.env.GHL_CALENDAR_ID;

  if (!locationId || !calendarId) {
    console.warn('GHL_LOCATION_ID or GHL_CALENDAR_ID not configured - skipping GHL appointment creation');
    return null;
  }

  if (!contactId) {
    console.warn('No GHL contactId provided - skipping appointment creation');
    return null;
  }

  try {
    // Parse date + time into ISO datetime
    const eventDate = new Date(appointmentData.date);
    const [hours, minutes] = appointmentData.time ? appointmentData.time.split(':') : ['09', '00'];
    eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 1); // 1-hour slot

    const body = {
      calendarId,
      locationId,
      contactId,
      startTime: eventDate.toISOString(),
      endTime: endDate.toISOString(),
      title: `Consultation: ${appointmentData.name}`,
      appointmentStatus: 'new',
      ...(appointmentData.notes ? { notes: appointmentData.notes } : {}),
    };

    const response = await fetch(`${GHL_BASE_URL}/calendars/events/appointments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GHL appointment creation failed (${response.status}):`, errorText);
      return null;
    }

    const data = await response.json();
    console.log('GHL appointment created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating GHL appointment:', error.message);
    return null;
  }
};

/**
 * Sync a consultation booking (contact + appointment) to GoHighLevel.
 */
export const syncConsultationToGHL = async (consultation) => {
  const contact = await createGHLContact({
    name: consultation.name,
    email: consultation.email,
    phone: consultation.phone,
    company: consultation.company,
    tags: ['consultation', 'website-lead'],
    source: 'website-consultation',
  });

  if (contact?.id) {
    await createGHLAppointment(
      {
        date: consultation.date,
        time: consultation.time,
        name: consultation.name,
        notes: [
          consultation.reason ? `Reason: ${consultation.reason}` : '',
          consultation.comments ? `Comments: ${consultation.comments}` : '',
          consultation.currentStatus ? `Current Status: ${consultation.currentStatus}` : '',
        ].filter(Boolean).join('\n'),
      },
      contact.id
    );
  }

  return contact;
};

/**
 * Sync a call request (contact only) to GoHighLevel.
 */
export const syncCallToGHL = async (call) => {
  const tags = call.source === 'subscribe-popup'
    ? ['email-subscriber', 'website-lead']
    : ['call-request', 'website-lead'];

  return createGHLContact({
    name: call.name,
    email: call.email,
    phone: call.phone,
    tags,
    source: call.source || 'website-call-request',
  });
};

export default {
  createGHLContact,
  createGHLAppointment,
  syncConsultationToGHL,
  syncCallToGHL,
};
