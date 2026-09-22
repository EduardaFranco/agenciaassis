/* ============================================================
   SUPABASE-CONFIG.JS — conexão com o banco de dados
   ============================================================ */

const SUPABASE_URL = "https://xzgbgisppsqeewufbdju.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Z2JnaXNwcHNxZWV3dWZiZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxMDU4OTMsImV4cCI6MjEwNTY4MTg5M30.yVRPMpXgbVyuqMcACM5NPKQT7hUNODIJj7RSDZ-1IXU";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
