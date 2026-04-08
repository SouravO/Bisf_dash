import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pszgnnbpyqvbdndcoelb.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzemdubmJweXF2YmRuZGNvZWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTc3MTIsImV4cCI6MjA5MDc3MzcxMn0.SZfNKtY_r59lm5OzyDgWrueILpT5zyMKy51di8tkEZE';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});