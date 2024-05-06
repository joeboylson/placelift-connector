import { createClient } from '@supabase/supabase-js'


const supabase = createClient("https://ovoyksiyukivurwhxzbk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92b3lrc2l5dWtpdnVyd2h4emJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4OTE1MzEsImV4cCI6MjAxNDQ2NzUzMX0.Hs9LYT8LbdqahjFglOByzuHGfsR_mjk2YOlPu9zcZ1M", {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

export default supabase;