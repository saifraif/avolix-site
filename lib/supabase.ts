import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jdrvvvelapxvtywmfgux.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcnZ2dmVsYXB4dnR5d21mZ3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDE1OTgsImV4cCI6MjA2MzUxNzU5OH0.le6L3BrKZzuFvo8jjLGecVaAe9qPfiyYPcBdcEqA8XY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
