// Supabase Bilgilerin (Kendi bilgilerini buraya yapıştır)
const SUPABASE_URL = 'https://gzazhrtgtbhomlblivxj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_buraya_kopyaladigin_uzun_anahtari_yapistir';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mesajları ekrana getirme fonksiyonu
async function loadMessages() {
    const { data: messages, error } = await supabaseClient
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Mesajlar yüklenemedi:', error);
        return;
    }

    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(msg => {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        div.innerHTML = `<b>Kullanıcı:</b> ${msg.content}`;
        messageList.appendChild(div);
    });
}

// Mesaj gönderme fonksiyonu
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (!text) return;

    const { error } = await supabaseClient
        .from('messages')
        .insert([{ content: text }]);

    if (error) {
        console.error('Mesaj gönderilemedi:', error);
    } else {
        input.value = '';
        loadMessages();
    }
}

// Sayfa açıldığında mesajları yükle
loadMessages();
