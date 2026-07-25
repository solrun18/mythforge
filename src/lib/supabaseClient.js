import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Accounts/login/saved-worlds are an optional layer on top of the app —
// everything else works with zero setup. If the env vars aren't set
// (fresh clone, no Supabase project yet), we skip creating a real client
// instead of throwing, and `isSupabaseConfigured` lets the rest of the
// app degrade gracefully (login button still shows, but explains what's
// missing instead of crashing).
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;
