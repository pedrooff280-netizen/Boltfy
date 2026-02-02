import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlbisifaowcvigtxhxzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYmlzaWZhb3djdmlndHhoeHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMjAyMzcsImV4cCI6MjA4NDc5NjIzN30.JGwjAnw7kC3wDY6t-8xWfeXxFE7FFvOIRt5cwxXmv2g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
