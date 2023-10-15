import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://uvisdzgjedmxzbhgdkxo.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aXNkemdqZWRteHpiaGdka3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODE5ODUsImV4cCI6MjAxMjg1Nzk4NX0.-crNBTygfh1jJoUV_yBbOn-FsqzutOuCYv06GRQecks";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
