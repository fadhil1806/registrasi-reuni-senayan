const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inisialisasi klien WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Event: Saat kode QR dihasilkan (untuk login pertama kali)
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Event: Ketika klien berhasil terhubung
client.on('ready', () => {
    console.log('Client is ready!');
});

// Memulai klien WhatsApp
client.initialize();

// Fungsi untuk mengirim pesan

const sendMessage = (nama) => {
    return new Promise((resolve, reject) => {
        const chatIds = [
            '6289514563365@c.us',
            '6281806346570@c.us'
        ];

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        // Format pesan
        const message = `
Reuni STAN 80
Hotel Harris FX Soedirman - Jakarta
Registrasi: Sabtu 31 Agustus 2024

Nama             : ${nama}
Waktu Hadir  : ${formattedTime}

Notification sent by the system
E-Absensi Digital SMK TI BAZMA
        `;

        // Kirim pesan ke semua chatId
        const promises = chatIds.map(chatId => 
            client.sendMessage(chatId, message)
        );

        Promise.all(promises)
            .then(responses => resolve(responses))
            .catch(err => reject(err));
    });
};

module.exports = { sendMessage };
