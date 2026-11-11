import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(
  envUrl &&
  envKey &&
  !envUrl.includes('placeholder.supabase.co')
);

const supabaseUrl = envUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = envKey || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
