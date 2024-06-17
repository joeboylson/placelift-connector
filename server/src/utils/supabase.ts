import { createClient } from "@supabase/supabase-js";
import { Database } from "@shared/types";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
