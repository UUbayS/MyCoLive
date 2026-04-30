# MyCoLive API - Postman Testing Guide

Panduan lengkap untuk testing semua endpoint API menggunakan Postman.

---

## 📋 Prerequisites

1. **Postman** sudah terinstall
2. **Backend running**: `bun run dev`
3. **Database**: PostgreSQL sudah running
4. **Seed done**: Admin sudah ada (`admin@mycolive.com` / `admin123`)
5. **.env**: JWT_SECRET sudah ada

---

## 🛠️ Setup Postman

### 1. Buat Environment

1. Klik **Environments** → **New Environment**
2. Nama: `MyCoLive Dev`
3. Variables:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:3000` | `http://localhost:3000` |
| `token` | (kosong) | (kosong) |
| `admin_token` | (kosong) | (kosong) |
| `penghuni_token` | (kosong) | (kosong) |
| `operator_token` | (kosong) | (kosong) |
| `properti_id` | (kosong) | (kosong) |
| `kamar_id` | (kosong) | (kosong) |
| `pemesanan_id` | (kosong) | (kosong) |
| `dana_id` | (kosong) | (kosong) |
| `komplain_id` | (kosong) | (kosong) |

4. Klik **Save**

### 2. Buat Collection

1. Klik **Collections** → **New Collection**
2. Nama: `MyCoLive API`
3. Klik **Add Request** untuk setiap endpoint di bawah

---

## 🧪 Test Sequence

---

## Bagian 1: AUTH (Tanpa Token)

### 1.1 Register Penghuni (Public)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/auth/register` |
| **Headers** | Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "username": "penghuni_test",
  "nama": "Penghuni Test",
  "email": "penghunitest@test.com",
  "no_telepon": "081234567890",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "user_id",
    "username": "penghuni_test",
    "email": "penghunitest@test.com",
    "role": "PENGHUNI"
  }
}
```

---

### 1.2 Login Admin (PEMILIK)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/auth/login` |
| **Headers** | Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "login": "admin@mycolive.com",
  "password": "admin123"
}
```

**Expected Response (200):**
```json
{
  "status": "success",
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "user": {
      "id": "...",
      "email": "admin@mycolive.com",
      "role": "PEMILIK"
    }
  }
}
```

**⚠️ Simpan access_token ke `admin_token` di environment**

---

### 1.3 Login Penghuni

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/auth/login` |
| **Body** | raw JSON |

```json
{
  "login": "penghunitest@test.com",
  "password": "password123"
}
```

**⚠️ Simpan access_token ke `penghuni_token` di environment**

---

### 1.4 Get Current User (Me)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/auth/me` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

**Expected Response (200):** Data user yang sedang login

---

### 1.5 Register Penghuni Lagi (untuk Operator)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/auth/register` |
| **Body** | raw JSON |

```json
{
  "username": "operator_test",
  "nama": "Operator Test",
  "email": "operatortest@test.com",
  "no_telepon": "089876543210",
  "password": "password123"
}
```

---

## Bagian 2: PUBLIC ENDPOINTS (Tanpa Token)

### 2.1 Get All Katalog

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/katalog` |

**Expected Response (200):** Array properti dengan kamar kosong

---

### 2.2 Get Katalog Detail

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/katalog/PROPERTI_ID` |

Ganti `PROPERTI_ID` dengan ID dari response katalog

---

## Bagian 3: PROPERTI (PEMILIK/PENGELOLA)

### 3.1 Get All Properti

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/properti` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

**Expected Response (200):** Array properti

**⚠️ Simpan salah satu properti_id ke `properti_id`**

---

### 3.2 Create Properti (PEMILIK Only)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/properti` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nama": "Kost Melati Testing",
  "alamat": "Jl. Testing No. 123, Jakarta",
  "jenis": "CAMPUR",
  "deskripsi": "Kost strategis dekat MRT",
  "kebijakan": "Tidak membawa pasangan"
}
```

**Expected Response (201):**

**⚠️ Simpan properti_id ke `properti_id`**

---

### 3.3 Get Properti Detail

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/properti/{{properti_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 3.4 Update Properti

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/properti/{{properti_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nama": "Kost Melati Updated",
  "deskripsi": "Deskripsi baru"
}
```

---

## Bagian 4: KAMAR

### 4.1 Get All Kamar (by Properti)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/properti/{{properti_id}}/kamar` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 4.2 Create Kamar

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/properti/{{properti_id}}/kamar` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nomor": "101",
  "luas": "3x4",
  "tipe": "REGULER",
  "fasilitas": ["AC", "KM Dalam", "Kasur", "Meja"],
  "tarif": {
    "1_bulan": 500000,
    "3_bulan": 1400000,
    "6_bulan": 2500000,
    "12_bulan": 4800000
  }
}
```

**Expected Response (201):**

**⚠️ Simpan kamar_id ke `kamar_id`**

---

### 4.3 Get Kamar Detail

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/kamar/{{kamar_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 4.4 Update Kamar

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/kamar/{{kamar_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nomor": "101A",
  "fasilitas": ["AC", "KM Dalam", "Kasur", "Meja", "Lemari"]
}
```

---

## Bagian 5: USER MANAGEMENT (PEMILIK)

### 5.1 Get All Users

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/users` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 5.2 Create Operator (Jadikan user jadi PENGELOLA)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/users` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "username": "operator_baru",
  "nama": "Operator Baru",
  "email": "operatorbaru@test.com",
  "no_telepon": "089999999999",
  "password": "password123",
  "role": "PENGELOLA",
  "properti_ids": ["{{properti_id}}"]
}
```

**⚠️ Simpan access_token baru ke `operator_token`**

---

### 5.3 Update User (Tanpa Role)

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/users/USER_ID` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nama": "Nama Diubah",
  "no_telepon": "081111111111"
}
```

**Catatan: Role tidak bisa diubah**

---

### 5.4 Delete User

| Field | Value |
|-------|-------|
| **Method** | DELETE |
| **URL** | `{{base_url}}/api/users/USER_ID` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

**Catatan: Tidak bisa hapus diri sendiri (400 error)**

---

## Bagian 6: TEMPAT PEMBAYARAN (PEMILIK Only)

### 6.1 Get Tempat Pembayaran

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/tempatpembayaran` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

**Expected:** `"message": "Tempat pembayaran belum di-configure"` (null)

---

### 6.2 Update Tempat Pembayaran

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/tempatpembayaran` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nama_rekening": "John Doe",
  "nomor_rekening": "1234567890",
  "bank": "BCA",
  "qris_image": ""
}
```

---

### 6.3 Get Tempat Pembayaran Lagi

Cek response sekarang ada data rekening

---

## Bagian 7: PEMESANAN

### 7.1 Get All Pemesanan (PEMILIK)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/pemesanan` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 7.2 Get My Pemesanan (PENGHUNI)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/pemesanan/my` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}` |

---

### 7.3 Create Pemesanan (PENGHUNI)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/pemesanan` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "kamar_id": "{{kamar_id}}",
  "durasi_sewa": 3,
  "tgl_masuk": "2026-05-01",
  "metode_bayar": "TRANSFER"
}
```

**Expected Response (201):** Ada info rekening dari settings

**⚠️ Simpan pemesanan_id ke `pemesanan_id`**

---

### 7.4 Get Pemesanan Detail (Test Access Control)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/pemesanan/{{pemesanan_id}}` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}` |

**Coba juga dengan operator_token - harusnya 403**

---

### 7.5 Upload Bukti Pembayaran (PENGHUNI)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/pemesanan/{{pemesanan_id}}/bayar` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "bukti": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

---

### 7.6 Verifikasi Pemesanan (PEMILIK)

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/pemesanan/{{pemesanan_id}}/verifikasi` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "status": "DITERIMA"
}
```

**Catatan: Jika DITERIMA, otomatis kamar menjadi TERISI**

---

## Bagian 8: PENGAJUAN DANA

### 8.1 Get All Dana (PEMILIK)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/dana` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 8.2 Create Dana (PENGELOLA)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/dana` |
| **Headers** | Authorization: Bearer `{{operator_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "tujuan": "Perbaikan WC kamar 101",
  "jumlah": 500000,
  "no_rekening": "1234567890",
  "properti_id": "{{properti_id}}"
}
```

**Expected Response (201):** Status default "MENUNGGU"

**⚠️ Simpan dana_id ke `dana_id`**

---

### 8.3 Get My Dana (PENGELOLA)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/dana/my` |
| **Headers** | Authorization: Bearer `{{operator_token}}` |

---

### 8.4 Get Dana Detail

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/dana/{{dana_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 8.5 Update Dana Status (PEMILIK)

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/dana/{{dana_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "status": "DITERIMA"
}
```

---

## Bagian 9: KOMPLAIN

### 9.1 Get All Komplain (PEMILIK/PENGELOLA)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/komplain` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 9.2 Create Komplain (PENGHUNI)

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/komplain` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "masalah": "AC tidak dingin",
  "jenis": "FASILITAS",
  "deskripsi": "AC di kamar 101 tidak dingin sudah 3 hari",
  "properti_id": "{{properti_id}}"
}
```

**Expected Response (201):** Status default "BARU"

**⚠️ Simpan komplain_id ke `komplain_id`**

---

### 9.3 Get My Komplain (PENGHUNI)

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/komplain/my` |
| **Headers** | Authorization: Bearer `{{penghuni_token}}` |

---

### 9.4 Get Komplain Detail

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/komplain/{{komplain_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

---

### 9.5 Update Komplain Status (PEMILIK/PENGELOLA)

| Field | Value |
|-------|-------|
| **Method** | PUT |
| **URL** | `{{base_url}}/api/komplain/{{komplain_id}}` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "status": "DIPROSES"
}
```

**Coba juga ubah ke "SELESAI"**

---

## Bagian 10: LAPORAN KEUANGAN (PEMILIK Only)

### 10.1 Get Laporan Keuangan

| Field | Value |
|-------|-------|
| **Method** | GET |
| **URL** | `{{base_url}}/api/laporan/keuangan?bulan=2026-04` |
| **Headers** | Authorization: Bearer `{{admin_token}}` |

**Query Parameters:**
- `bulan` (wajib): YYYY-MM
- `properti_id` (opsional): filter per properti

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "bulan": "2026-04",
    "total_pemasukan": 0,
    "total_pengeluaran": 0,
    "pendapatan": 0,
    "detail_per_properti": []
  }
}
```

---

## Bagian 11: WHATSAPP BROADCAST (PEMILIK Only)

### 11.1 Send Broadcast

| Field | Value |
|-------|-------|
| **Method** | POST |
| **URL** | `{{base_url}}/api/whatsapp/broadcast` |
| **Headers** | Authorization: Bearer `{{admin_token}}`, Content-Type: application/json |
| **Body** | raw JSON |

```json
{
  "nomor": ["6281234567890"],
  "pesan": "Halo! Ini pesan broadcast dari MyCoLive"
}
```

**Catatan:** Akan gagal jika WHATSAPP_API_KEY belum dikonfigurasi di .env - ini normal

---

## 🎯 Test Access Control

Coba endpoint-endpoint ini dengan role yang salah:

| Endpoint | Token yang Digunakan | Expected |
|----------|---------------------|----------|
| `/api/tempatpembayaran` | `penghuni_token` | 403 Forbidden |
| `/api/laporan/keuangan` | `operator_token` | 403 Forbidden |
| `/api/dana` (POST) | `admin_token` | 403 Forbidden |
| `/api/pemesanan` (POST) | `admin_token` | 403 Forbidden |

---

## 🧹 Cleanup / Delete Tests

### Delete Kamar
```bash
DELETE /api/kamar/{{kamar_id}}
```

### Delete Properti
```bash
DELETE /api/properti/{{properti_id}}
```

**Catatan:** Akan gagal jika ada kamar, penghuni aktif, atau pemesanan aktif

---

## ✅ Checklist Testing

| No | Test | Status |
|----|------|--------|
| 1 | Register berhasil | ☐ |
| 2 | Login dapat token | ☐ |
| 3 | Katalog public bisa diakses | ☐ |
| 4 | Properti CRUD berhasil | ☐ |
| 5 | Kamar CRUD berhasil | ☐ |
| 6 | User management berhasil | ☐ |
| 7 | Tempat pembayaran hanya PEMILIK | ☐ |
| 8 | Pemesanan flow lengkap | ☐ |
| 9 | Pengajuan Dana flow lengkap | ☐ |
| 10 | Komplain flow lengkap | ☐ |
| 11 | Laporan keuangan works | ☐ |
| 12 | Access control berfungsi | ☐ |
| 13 | Error messages jelas | ☐ |

---

## 📝 Catatan Penting

1. **Token Expire**: Access token expires 15 menit. Refresh dengan `/api/auth/refresh`

2. **Test Data**: Setelah test selesai, data akan tetap di database. Untuk reset bisa:
   - Hapus manual di Prisma Studio: `bun run db:studio`
   - Atau reinstall database

3. **API Response Format**: Semua response konsisten:
   ```json
   {
     "status": "success" | "error",
     "data": ...,
     "message": "..." // opsional
   }
   ```

4. **Error Handling**:
   - 400: Bad Request (input tidak valid)
   - 401: Unauthorized (token tidak ada/invalid)
   - 403: Forbidden (role tidak punya akses)
   - 404: Not Found (resource tidak ada)
   - 500: Internal Server Error

---

## 🔧 Troubleshooting

### Error: "JWT_SECRET environment variable is required"
→ Tambahin JWT_SECRET di file .env

### Error: "connection refused"
→ Pastikan PostgreSQL running

### Error: "Unauthorized: Invalid token"
→ Login ulang, token mungkin expired

---

Happy Testing! 🚀