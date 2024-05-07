import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export default supabase;
