import { supabase } from './supabaseClient';

export async function saveLead({ name, email, phone, source, date, time }) {
  const { error } = await supabase.from('leads').insert({
    name,
    email,
    phone: phone || null,
    source: source || null,
    date: date || null,
    time: time || null,
  });

  if (error) throw error;
}
