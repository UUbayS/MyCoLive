# MyCoLive Backend

API Backend untuk aplikasi manajemen kos-kosan (MyCoLive) menggunakan Bun + Hono + Prisma + PostgreSQL.

---

## 🚀 Quick Start

### Prerequisites
- Bun installed
- PostgreSQL running
- Node.js (optional)

### Installation

```bash
# Install dependencies
bun install

# Generate Prisma Client
bun run db:generate

# Push schema ke database
bun run db:push

# Seed admin pertama (opsional)
bun run db:seed
```

### Run Development

```bash
bun run dev
```

Server akan running di `http://localhost:3000`

---

## 📋 Endpoint API

### Authentication

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/auth/register` | Public | Register penghuni |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/refresh` | Login | Refresh token |
| GET | `/api/auth/me` | Login | Get current user |

### Users Management

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/users` | PEMILIK | List semua user |
| POST | `/api/users` | PEMILIK | Buat user/operator |
| GET | `/api/users/:id` | PEMILIK | Detail user |
| PUT | `/api/users/:id` | PEMILIK | Update user (tidak bisa ubah role) |
| DELETE | `/api/users/:id` | PEMILIK | Hapus user (tidak bisa hapus diri sendiri) |

### Properti

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/properti` | PEMILIK/PENGELOLA | List properti |
| POST | `/api/properti` | PEMILIK | Tambah properti |
| GET | `/api/properti/:id` | PEMILIK/PENGELOLA | Detail properti |
| PUT | `/api/properti/:id` | PEMILIK | Update properti |
| DELETE | `/api/properti/:id` | PEMILIK | Hapus properti (cek dependencies) |

### Katalog (Public)

| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/katalog` | Semua properti & kamar kosong |
| GET | `/api/katalog/:id` | Detail properti |

### Kamar

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/properti/:id/kamar` | PEMILIK/PENGELOLA | List kamar |
| POST | `/api/properti/:id/kamar` | PEMILIK | Tambah kamar |
| GET | `/api/kamar/:id` | PEMILIK/PENGELOLA | Detail kamar |
| PUT | `/api/kamar/:id` | PEMILIK | Update kamar |
| DELETE | `/api/kamar/:id` | PEMILIK | Hapus kamar |

### Tempat Pembayaran

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/tempatpembayaran` | PEMILIK | Get rekening/QRIS |
| PUT | `/api/tempatpembayaran` | PEMILIK | Update rekening/QRIS |

### Pemesanan

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/pemesanan` | PENGHUNI | Buat pesanan |
| GET | `/api/pemesanan/my` | PENGHUNI | Riwayat pesanan saya |
| GET | `/api/pemesanan/:id` | PEMILIK/PENGELOLA/PENGHUNI | Detail pesanan (ownership check) |
| POST | `/api/pemesanan/:id/bayar` | PENGHUNI | Upload bukti |
| GET | `/api/pemesanan` | PEMILIK | List semua pesanan |
| PUT | `/api/pemesanan/:id/verifikasi` | PEMILIK | Verifikasi pesanan |

### Penghuni Management

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/penghuni` | PEMILIK/PENGELOLA | List penghuni |
| GET | `/api/penghuni/:id` | PEMILIK/PENGELOLA | Detail penghuni (ownership check) |

### Pengajuan Dana

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/dana` | PENGELOLA | Ajukan dana |
| GET | `/api/dana/my` | PENGELOLA | Riwayat pengajuan saya |
| GET | `/api/dana` | PEMILIK | Lihat semua pengajuan |
| GET | `/api/dana/:id` | PEMILIK/PENGELOLA | Detail pengajuan |
| PUT | `/api/dana/:id` | PEMILIK | Terima/Tolak pengajuan |

### Komplain

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/komplain` | PENGHUNI | Ajukan komplain |
| GET | `/api/komplain/my` | PENGHUNI | Riwayat komplain saya |
| GET | `/api/komplain` | PEMILIK/PENGELOLA | Lihat semua komplain |
| GET | `/api/komplain/:id` | All (dengan ownership) | Detail komplain |
| PUT | `/api/komplain/:id` | PEMILIK/PENGELOLA | Update status (DIPROSES/SELESAI) |

### Laporan Keuangan

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/laporan/keuangan?bulan=YYYY-MM&properti_id=xxx` | PEMILIK | Laporan bulanan |

### WhatsApp Broadcast

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/whatsapp/broadcast` | PEMILIK | Kirim broadcast WA |

---

## 🔐 Role Permissions

| Feature | PEMILIK | PENGELOLA | PENGHUNI |
|---------|---------|-----------|----------|
| Users Management | ✅ CRUD | ❌ | ❌ |
| Properti | ✅ CRUD | ✅ Read/Update | ❌ |
| Kamar | ✅ CRUD | ✅ CRUD | ❌ |
| Tempat Pembayaran | ✅ R/W | ❌ | ❌ |
| Pemesanan | ✅ CRUD | ❌ | ✅ Create/Read own |
| Penghuni | ✅ Read | ✅ Read own | ❌ |
| Pengajuan Dana | ✅ Approve | ✅ Create/Read | ❌ |
| Komplain | ✅ View/Resolve | ✅ View/Resolve | ✅ Create/View own |
| Laporan Keuangan | ✅ View | ❌ | ❌ |
| WhatsApp Broadcast | ✅ Send | ❌ | ❌ |

---

## 🔧 Configuration

Buat file `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=comprodb
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/comprodb?schema=public"

# JWT (WAJIB - harus ada!)
JWT_SECRET=your-random-secret-key

# WhatsApp Broadcast (Opsional - untuk fitur broadcast)
WHATSAPP_PROVIDER=whapi
WHATSAPP_API_KEY=your-whapi-api-key
WHATSAPP_CHANNEL_ID=your-whapi-channel-id
```

---

## 📝 Request Examples

### Register Penghuni
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "budi123",
    "nama": "Budi Santoso",
    "no_telepon": "081234567890",
    "email": "budi@test.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "admin@mycolive.com",
    "password": "admin123"
  }'
```

### Tambah Properti (PEMILIK only)
```bash
curl -X POST http://localhost:3000/api/properti \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Kost Melati",
    "alamat": "Jl. Merdeka No.123, Jakarta",
    "jenis": "CAMPUR",
    "deskripsi": "Kost strategis",
    "kebijakan": "Tidak membawa pasangan"
  }'
```

### Ajukan Komplain (PENGHUNI)
```bash
curl -X POST http://localhost:3000/api/komplain \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "masalah": "WC rusak",
    "jenis": "FASILITAS",
    "deskripsi": "WC di kamar 3 tidak bisa flush",
    "foto": "data:image/jpeg;base64,...",
    "properti_id": "PROPERTI_ID"
  }'
```

### Ajukan Dana (PENGELOLA)
```bash
curl -X POST http://localhost:3000/api/dana \
  -H "Authorization: Bearer OPERATOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tujuan": "Perbaikan WC",
    "jumlah": 500000,
    "no_rekening": "1234567890",
    "foto": "data:image/jpeg;base64,...",
    "properti_id": "PROPERTI_ID"
  }'
```

### Laporan Keuangan (PEMILIK)
```bash
curl "http://localhost:3000/api/laporan/keuangan?bulan=2024-06" \
  -H "Authorization: Bearer PEMILIK_TOKEN"
```

### WhatsApp Broadcast (PEMILIK)
```bash
curl -X POST http://localhost:3000/api/whatsapp/broadcast \
  -H "Authorization: Bearer PEMILIK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nomor": ["6281234567890", "6289876543210"],
    "pesan": "Halo! Ini pemberitahuan dari MyCoLive"
  }'
```

---

## 🗄️ Database Schema

### Models

| Model | Deskripsi |
|-------|-----------|
| **User** | User dengan role (PEMILIK, PENGELOLA, PENGHUNI) |
| **Properti** | Data kos |
| **Kamar** | Kamar per properti |
| **Pemesanan** | Pemesanan kamar |
| **Pembayaran** | Bukti pembayaran |
| **Penghuni** | Profile penghuni |
| **Operator** | Relasi user-operator-properti |
| **Komplain** | Pelaporan komplain (masalah, jenis, foto) |
| **PengajuanDana** | Request dana dari operator (tujuan, jumlah, no_rekening, foto) |
| **AdminSettings** | Settings rekening admin (nama_rekening, nomor_rekening, bank, qris_image) |

---

## 🛠️ Available Scripts

| Command | Keterangan |
|---------|-----------|
| `bun run dev` | Run development server |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:migrate` | Run migration |
| `bun run db:push` | Push schema ke database |
| `bun run db:seed` | Seed admin pertama |
| `bun run db:studio` | Open Prisma Studio |

---

## 👤 Default Admin

Setelah running seed:

- **Email**: admin@mycolive.com
- **Password**: admin123

⚠️ **IMPORTANT**: Ganti password setelah login pertama!

---

## 🔒 Security Notes

- JWT_SECRET wajib ada di .env (app tidak akan jalan jika kosong)
- Semua endpoint sensitif sudah ada access control
- Properti deletion akan dicek untuk dependencies (kamar, penghuni aktif, pemesanan aktif)
- User tidak bisa hapus diri sendiri
- Role modification sudah dinonaktifkan

---

## 📦 Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Auth**: JWT + bcryptjs
- **WhatsApp**: Whapi.Cloud (configurable)

---

## 📄 Lisensi

MIT