# Kafka Tryout with Express.js

Proyek ini adalah percobaan sederhana untuk mempelajari integrasi **Apache Kafka** dengan **Express.js**. Proyek ini mencakup penggunaan Kafka sebagai _Message Broker_ untuk mengelola alur verifikasi email dan Express.js sebagai kerangka kerja REST API.

## Pengantar

### Apa itu Kafka?

Kafka adalah platform _distributed streaming_ yang memungkinkan komunikasi antar aplikasi secara asinkron melalui konsep _Publish-Subscribe_. Kafka sering digunakan untuk membangun _real-time data pipelines_.

### Apa itu Express.js?

Express.js adalah kerangka kerja aplikasi web Node.js minimalis yang digunakan untuk membangun aplikasi web dan API.

## Fitur Utama

### Implementasi Kafka

- **Producer**: Mengirimkan pesan ke _Topic_ Kafka.
- **Consumer**: Mendengarkan dan memproses pesan dari _Topic_ Kafka.
- **Topic**: Tempat penyimpanan pesan yang dikategorikan.
- **Consumer Group**: Grup konsumen untuk membaca pesan secara efisien.

### Integrasi Kafka dengan Express.js

Proyek ini menggunakan Kafka untuk mengelola alur verifikasi email:

1. **Producer**: Mengirim data pengguna ke Kafka saat pendaftaran.
2. **Consumer**: Mendengarkan pesan dari Kafka dan memproses verifikasi email.
3. **Express.js API**:
   - Endpoint untuk pendaftaran pengguna.
   - Endpoint untuk memverifikasi email melalui token.

## Struktur Proyek

Berikut adalah struktur direktori utama proyek ini:

```
kafka-tryon/
├── config/
│   └── kafkaClient.js            # Konfigurasi Kafka
├── controller/
│   └── authController.js         # Logika pendaftaran dan verifikasi
├── routes/
│   └── authRoutes.js             # Definisi endpoint API
├── service/
│   ├── emailService.js           # Kafka Producer untuk mengirim pesan
│   └── kafkaConsumer.js          # Kafka Consumer untuk memproses pesan
├── utils/
│   └── userStorage.js            # Penyimpanan data pengguna sederhana
├── server.js                     # File utama untuk menjalankan server Express.js
└── summary_kafka.md              # Panduan belajar Kafka
```

## Cara Kerja

### 1. Pendaftaran Pengguna

Saat pengguna mendaftar:

1. Data pengguna disimpan beserta token verifikasi.
2. Pesan dikirim ke Kafka dengan data pengguna.
3. Endpoint terkait: `POST /api/auth/register`.

### 2. Konsumsi Pesan Kafka

Kafka Consumer:

1. Mendengarkan _Topic_ Kafka (`verification_emails`).
2. Mengambil pesan dan mencetak link verifikasi ke terminal.

### 3. Verifikasi Email

Pengguna dapat memverifikasi email dengan mengakses link yang dicetak di terminal:

1. Endpoint terkait: `GET /api/auth/verify?token=<token>`.
2. Token diverifikasi dan status pengguna diperbarui.

## Contoh Alur

1. **Mendaftarkan Pengguna**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"email": "user@example.com"}'
   ```
2. **Verifikasi Email**:
   - Gunakan link verifikasi yang dicetak di terminal Kafka Consumer.

## Menjalankan Proyek

### Prasyarat

- **Node.js** dan **npm** terinstal.
- Kafka berjalan pada `localhost:9092`.

### Langkah Menjalankan

1. Jalankan Kafka dan Zookeeper:
   ```bash
   kafka-server-start.bat config/server.properties
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server Express.js:
   ```bash
   nodemon server.js
   ```

## Teknologi yang Digunakan

- **Node.js**: Untuk menjalankan aplikasi server.
- **Express.js**: Kerangka kerja REST API.
- **Kafkajs**: Library Kafka untuk Node.js.
- **Middleware**:
  - _Body-parser_: Mem-parsing body request.
  - _Cors_: Mengizinkan lintas domain.
  - _Helmet_: Menambah keamanan aplikasi.
  - _Morgan_: Logging request HTTP.

## Kontribusi

Jika Anda memiliki ide, perbedaan pendapat dan saran, silakan buat **Pull Request** atau buka **Issues**.