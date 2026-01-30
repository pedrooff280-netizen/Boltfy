import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlbisifaowcvigtxhxzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYmlzaWZhb3djdmlndHhoeHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMjAyMzcsImV4cCI6MjA4NDc5NjIzN30.JGwjAnw7kC3wDY6t-8xWfeXxFE7FFvOIRt5cwxXmv2g';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function signUpUser() {
    const { data, error } = await supabase.auth.signUp({
        email: 'pedrooff280@gmail.com',
        password: '123456',
    });

    if (error) {
        console.error('Erro ao criar usuário:', error.message);
    } else {
        console.log('Usuário criado com sucesso:', data.user?.email);
        console.log('Lembre-se de confirmar o e-mail se o Auto-Confirm estiver desativado no Supabase dashboard.');
    }
}

signUpUser();
