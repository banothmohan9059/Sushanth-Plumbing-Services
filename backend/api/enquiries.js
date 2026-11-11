import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Name is too short').max(100, 'Name is too long'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  pinCode: z.string().regex(/^[0-9]{6}$/, 'Invalid PIN code'),
  locality: z.string().optional(),
  serviceSelection: z.string().min(1, 'Service is required'),
  description: z.string().min(10, 'Description is too short').max(1000, 'Description is too long'),
  preferredContact: z.enum(['phone', 'whatsapp']),
});

export default async function handler(req, res) {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',');
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = enquirySchema.parse(req.body);

    if (!supabase) {
      console.error('Supabase is not configured properly.');
      return res.status(500).json({ error: 'Database not configured' });
    }

    const { error } = await supabase
      .from('enquiries')
      .insert([
        {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          pin_code: data.pinCode,
          service_selection: data.serviceSelection,
          description: data.description,
          preferred_contact: data.preferredContact,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save enquiry' });
    }

    res.status(200).json({ success: true, message: 'Enquiry saved successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
