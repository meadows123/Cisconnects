import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Environment loaded:');
console.log('- Supabase URL:', supabaseUrl ? '✓ Configured' : '✗ Missing');
console.log('- Supabase Key:', supabaseKey ? '✓ Configured' : '✗ Missing');
console.log('- EmailJS Service ID:', process.env.VITE_EMAILJS_SERVICE_ID ? '✓ Configured' : '✗ Missing');
console.log('- EmailJS Public Key:', process.env.VITE_EMAILJS_PUBLIC_KEY ? '✓ Configured' : '✗ Missing');

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
app.post('/api/consultations', (req, res) => {
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
app.post('/api/calls', (req, res) => {
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
