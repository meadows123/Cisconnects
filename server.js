import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { createCalendarEvent, createCallEvent } from './utils/googleCalendar.js';
import { syncConsultationToGHL, syncCallToGHL } from './utils/goHighLevel.js';

// Load environment variables from .env and .env.local
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CONSULTATIONS_FILE = path.join(__dirname, 'consultations.json');
const CALLS_FILE = path.join(__dirname, 'calls.json');
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Initialize Supabase (optional — falls back to JSON files if not configured)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;
let supabase = null;
try {
  if (supabaseUrl && supabaseKey) supabase = createClient(supabaseUrl, supabaseKey);
} catch (e) {
  console.warn('Supabase init skipped:', e.message);
}

console.log('Environment loaded:');
console.log('- Supabase URL:', supabaseUrl ? '✓ Configured' : '✗ Missing');
console.log('- Supabase Key:', supabaseKey ? '✓ Configured' : '✗ Missing');
console.log('- EmailJS Service ID:', process.env.VITE_EMAILJS_SERVICE_ID ? '✓ Configured' : '✗ Missing');
console.log('- EmailJS Public Key:', process.env.VITE_EMAILJS_PUBLIC_KEY ? '✓ Configured' : '✗ Missing');
console.log('- Google Calendar:', process.env.GOOGLE_CREDENTIALS ? '✓ Configured' : '✗ Missing');
console.log('- GoHighLevel API Key:', process.env.GHL_API_KEY ? '✓ Configured' : '✗ Missing');
console.log('- GoHighLevel Location ID:', process.env.GHL_LOCATION_ID ? '✓ Configured' : '✗ Missing');
console.log('- GoHighLevel Calendar ID:', process.env.GHL_CALENDAR_ID ? '✓ Configured' : '✗ Missing');

// Redirect any non-canonical host to www.conxiea.com
app.use((req, res, next) => {
  const host = req.hostname;
  if (host && host !== 'conxiea.com' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://conxiea.com${req.originalUrl}`);
  }
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions for Consultations
const readConsultations = () => {
  if (fs.existsSync(CONSULTATIONS_FILE)) {
    const data = fs.readFileSync(CONSULTATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const writeConsultations = (data) => {
  fs.writeFileSync(CONSULTATIONS_FILE, JSON.stringify(data, null, 2));
};

// Helper functions for Calls
const readCalls = () => {
  if (fs.existsSync(CALLS_FILE)) {
    const data = fs.readFileSync(CALLS_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const writeCalls = (data) => {
  fs.writeFileSync(CALLS_FILE, JSON.stringify(data, null, 2));
};

// Helper functions for Leads
const readLeads = () => {
  if (fs.existsSync(LEADS_FILE)) {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const writeLeads = (data) => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2));
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Routes

// GET all consultations
app.get('/api/consultations', (req, res) => {
  try {
    const consultations = readConsultations();
    res.json(consultations);
  } catch (error) {
    console.error('Error reading consultations:', error);
    res.status(500).json({ error: 'Failed to read consultations' });
  }
});

// POST new consultation
app.post('/api/consultations', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      date,
      time,
      currentStatus,
      reason,
      comments
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !currentStatus || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const consultation = {
      id: generateId(),
      name,
      email,
      phone,
      company: company || '',
      date,
      time,
      currentStatus,
      reason,
      comments: comments || '',
      status: 'pending',
      bookedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const consultations = readConsultations();
    consultations.push(consultation);
    writeConsultations(consultations);

    // Sync to Google Calendar
    await createCalendarEvent(consultation);

    // Sync to GoHighLevel (contact + appointment)
    syncConsultationToGHL(consultation).catch(err =>
      console.error('GHL consultation sync error (non-blocking):', err.message)
    );

    res.status(201).json(consultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ error: 'Failed to create consultation' });
  }
});

// PATCH update consultation status
app.patch('/api/consultations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const consultations = readConsultations();
    const consultation = consultations.find(c => c.id === id);

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    consultation.status = status;
    consultation.updatedAt = new Date().toISOString();
    writeConsultations(consultations);

    res.json(consultation);
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ error: 'Failed to update consultation' });
  }
});

// DELETE consultation
app.delete('/api/consultations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const consultations = readConsultations();
    const filteredConsultations = consultations.filter(c => c.id !== id);

    if (filteredConsultations.length === consultations.length) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    writeConsultations(filteredConsultations);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: 'Failed to delete consultation' });
  }
});

// CALLS API ENDPOINTS

// GET all calls
app.get('/api/calls', (req, res) => {
  try {
    const calls = readCalls();
    res.json(calls);
  } catch (error) {
    console.error('Error reading calls:', error);
    res.status(500).json({ error: 'Failed to read calls' });
  }
});

// POST new call request
app.post('/api/calls', async (req, res) => {
  try {
    const { name, email, phone, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const call = {
      id: generateId(),
      name,
      email,
      phone,
      status: 'pending',
      createdAt: timestamp || new Date().toISOString()
    };

    const calls = readCalls();
    calls.push(call);
    writeCalls(calls);

    // Sync to Google Calendar
    await createCallEvent(call);

    // Sync to GoHighLevel (contact)
    syncCallToGHL(call).catch(err =>
      console.error('GHL call sync error (non-blocking):', err.message)
    );

    res.status(201).json(call);
  } catch (error) {
    console.error('Error creating call request:', error);
    res.status(500).json({ error: 'Failed to create call request' });
  }
});

// DELETE call request
app.delete('/api/calls/:id', (req, res) => {
  try {
    const { id } = req.params;
    const calls = readCalls();
    const filteredCalls = calls.filter(c => c.id !== id);

    if (filteredCalls.length === calls.length) {
      return res.status(404).json({ error: 'Call request not found' });
    }

    writeCalls(filteredCalls);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting call request:', error);
    res.status(500).json({ error: 'Failed to delete call request' });
  }
});

// GET all leads
app.get('/api/leads', async (req, res) => {
  try {
    let leads = [];
    
    // Try to fetch from Supabase first
    if (supabaseUrl && supabaseKey) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase fetch error:', error);
        // Fall back to JSON file
        leads = readLeads();
      } else {
        leads = data || [];
      }
    } else {
      // Use JSON file if Supabase not configured
      leads = readLeads();
    }
    
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// POST new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    console.log(`📝 New lead request: ${name} (${email})`);

    const newLead = {
      name,
      email,
      source: source || 'lead-magnet',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Save to Supabase
    let supabaseError = null;
    let savedLead = null;
    
    if (supabaseUrl && supabaseKey) {
      console.log('📤 Attempting to save to Supabase...');
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select();
      
      if (error) {
        console.error('❌ Supabase error:', error);
        supabaseError = error;
      } else if (data && data.length > 0) {
        savedLead = data[0];
        console.log('✅ Successfully saved to Supabase:', savedLead.id);
      }
    } else {
      console.warn('⚠️ Supabase not configured, skipping database save');
    }

    // Also save to JSON file as backup
    const leads = readLeads();
    const jsonLead = {
      id: savedLead?.id || (Date.now().toString(36) + Math.random().toString(36).substr(2)),
      ...newLead
    };
    leads.push(jsonLead);
    writeLeads(leads);
    console.log('✅ Saved to JSON file');

    // Sync to Google Calendar
    await createCallEvent({ name, email, phone: '', createdAt: newLead.created_at }).catch(err =>
      console.error('Google Calendar lead sync error (non-blocking):', err.message)
    );

    // Sync to GoHighLevel as a contact
    syncCallToGHL({ name, email, phone: '', source, createdAt: newLead.created_at }).catch(err =>
      console.error('GHL lead sync error (non-blocking):', err.message)
    );

    // Return the saved lead
    const responseData = savedLead ? { ...savedLead, backup: 'also saved to local file' } : jsonLead;
    res.status(201).json(responseData);
  } catch (error) {
    console.error('❌ Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead', details: error.message });
  }
});

// UPDATE lead status
app.patch('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leads = readLeads();
    const lead = leads.find(l => l.id === id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.status = status;
    writeLeads(leads);
    res.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE lead
app.delete('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const leads = readLeads();
    const filteredLeads = leads.filter(l => l.id !== id);

    if (filteredLeads.length === leads.length) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    writeLeads(filteredLeads);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// GET available booking slots for a given date
// Tries GHL free-slots API first, falls back to default business hours
app.get('/api/ghl-slots', async (req, res) => {
  const { date } = req.query; // expects YYYY-MM-DD
  if (!date) return res.status(400).json({ error: 'date query param required' });

  const generateDefaultSlots = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    if (day === 0 || day === 6) return []; // no weekends
    return [
      '09:00','09:30','10:00','10:30','11:00','11:30',
      '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'
    ].map(time => ({ time }));
  };

  const calendarId = process.env.GHL_CALENDAR_ID;
  const apiKey = process.env.GHL_API_KEY;

  if (!calendarId || !apiKey) {
    return res.json({ slots: generateDefaultSlots(date), source: 'default' });
  }

  try {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const url = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${start.getTime()}&endDate=${end.getTime()}&timezone=Europe%2FLondon`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
      },
    });

    if (!response.ok) throw new Error(`GHL slots ${response.status}`);

    const data = await response.json();
    // GHL returns { _dates_: { 'YYYY-MM-DD': [ { slots: ['ISO...'] } ] } }
    const dateKey = Object.keys(data._dates_ || {})[0] || date;
    const rawSlots = data._dates_?.[dateKey]?.[0]?.slots || [];
    const slots = rawSlots.map(s => ({
      time: new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' }),
    }));

    res.json({ slots: slots.length ? slots : generateDefaultSlots(date), source: slots.length ? 'ghl' : 'default' });
  } catch (err) {
    console.error('GHL slots error:', err.message);
    res.json({ slots: generateDefaultSlots(date), source: 'default' });
  }
});

// GHL Webhook — receives appointment/contact events from GoHighLevel
// Configure in GHL: Settings → Integrations → Webhooks → add your URL:
//   https://YOUR_DOMAIN/api/ghl-webhook
// Events to enable: AppointmentCreate, ContactCreate
app.post('/api/ghl-webhook', async (req, res) => {
  try {
    const payload = req.body;
    const eventType = payload?.type || payload?.event || '';

    console.log('📥 GHL Webhook received:', eventType);

    // Extract contact/appointment fields regardless of payload shape
    const contactData = payload?.contact || payload?.data || payload || {};
    const appointmentData = payload?.appointment || payload?.data || {};

    const name = [contactData.firstName, contactData.lastName].filter(Boolean).join(' ').trim()
      || contactData.name || appointmentData.title?.replace(/^Consultation:\s*/i, '') || 'Unknown';
    const email = contactData.email || appointmentData.email || '';
    const phone = contactData.phone || contactData.phoneNumber || appointmentData.phone || '';
    const company = contactData.companyName || contactData.company || '';

    // Only save if we have at least an email
    if (!email) {
      console.warn('GHL webhook: no email in payload, skipping save');
      return res.status(200).json({ received: true, saved: false });
    }

    const startTime = appointmentData.startTime || payload.startTime || null;
    const date = startTime ? new Date(startTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const time = startTime
      ? new Date(startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
      : '';

    const consultation = {
      id: generateId(),
      name,
      email,
      phone,
      company,
      date,
      time,
      currentStatus: 'GHL Booking',
      reason: `Booked via website widget (${eventType || 'appointment'})`,
      comments: `GHL Contact ID: ${contactData.id || 'n/a'} | Calendar: ${appointmentData.calendarId || 'n/a'}`,
      source: 'ghl-booking-widget',
      status: 'confirmed',
      bookedAt: startTime || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Save to consultations.json
    const consultations = readConsultations();
    // Avoid duplicates from re-delivered webhooks
    const alreadyExists = consultations.some(c => c.email === email && c.date === date && c.time === time);
    if (!alreadyExists) {
      consultations.push(consultation);
      writeConsultations(consultations);
      console.log(`✅ GHL booking saved: ${name} (${email})`);
    } else {
      console.log(`⚠️ GHL booking duplicate skipped: ${name} (${email})`);
    }

    // Save to Supabase if configured
    if (supabaseUrl && supabaseKey) {
      const { error } = await supabase.from('consultations').insert([consultation]);
      if (error) console.error('Supabase GHL webhook save error:', error.message);
      else console.log('✅ GHL booking saved to Supabase');
    }

    res.status(200).json({ received: true, saved: !alreadyExists });
  } catch (error) {
    console.error('GHL Webhook error:', error.message);
    // Always return 200 so GHL doesn't retry endlessly
    res.status(200).json({ received: true, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Serve built frontend — must come after all API routes
const BUILD_DIR = path.join(__dirname, 'build');
if (fs.existsSync(BUILD_DIR)) {
  app.use(express.static(BUILD_DIR));
  // Fallback to index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
