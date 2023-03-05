import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uycuumgjruuykahnursu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
