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

### Properti

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/properti` | PEMILIK/PENGELOLA | List properti |
| POST | `/api/properti` | PEMILIK | Tambah properti |
| GET | `/api/properti/:id` | PEMILIK/PENGELOLA | Detail properti |
| PUT | `/api/properti/:id` | PEMILIK | Update properti |
| DELETE | `/api/properti/:id` | PEMILIK | Hapus properti |

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

### Pemesanan

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| POST | `/api/pemesanan` | PENGHUNI | Buat pesanan |
| GET | `/api/pemesanan/my` | PENGHUNI | Riwayat pesanan saya |
| POST | `/api/pemesanan/:id/bayar` | PENGHUNI | Upload bukti |
| GET | `/api/pemesanan` | PEMILIK | List semua pesanan |
| PUT | `/api/pemesanan/:id/verifikasi` | PEMILIK | Verifikasi pesanan |

### Penghuni Management

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/penghuni` | PEMILIK/PENGELOLA | List penghuni |

### Settings Admin

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|-----------|
| GET | `/api/settings` | PEMILIK | Get settings |
| PUT | `/api/settings` | PEMILIK | Update settings |

---

## 🔧 Configuration

Buat file `.env` berdasarkan `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=comprodb

DATABASE_URL="postgresql://postgres:your_password@localhost:5432/comprodb?schema=public"
JWT_SECRET=your_secret_key
```

---

## 📝 Request Examples

### Register Penghuni
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "budi123",
    "nama_lengkap": "Budi Santoso",
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

### Tambah Kamar (PEMILIK only)
```bash
curl -X POST http://localhost:3000/api/properti/PROPERTI_ID/kamar \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nomor": "101",
    "luas": "3x4",
    "fasilitas": ["AC", "KM Dalam", "Kasur"],
    "tarif": {
      "1_bulan": 500000,
      "3_bulan": 1400000,
      "6_bulan": 2500000
    }
  }'
```

### Buat Pesanan (PENGHUNI)
```bash
curl -X POST http://localhost:3000/api/pemesanan \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "kamar_id": "KAMAR_ID",
    "durasi_sewa": 3,
    "tgl_masuk": "2024-06-01",
    "metode_bayar": "TRANSFER"
  }'
```

---

## 🗄️ Database Schema

### Models

- **User** - user dengan role (PEMILIK, PENGELOLA, PENGHUNI)
- **Properti** - data kos
- **Kamar** - kamar per properti
- **Pemesanan** - pemesanan kamar
- **Pembayaran** - bukti pembayaran
- **Penghuni** - profile penghuni
- **Operator** - relasi user-operator-properti
- **Komplain** - pelaporan komplain
- **PengajuanDana** - request dana dari operator
- **AdminSettings** - settings rekening admin

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

## 📦 Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT + bcryptjs

---

## 📄 Lisensi

MIT