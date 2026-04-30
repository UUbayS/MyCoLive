# MyCoLive API - Postman Collection Guide

## 📥 Import ke Postman

### Option 1: Manual Import Collection
1. Buka Postman
2. Klik **Import** → **Paste Raw Text**
3. Paste JSON di bawah ini

### Option 2: Environment Variables
Buat environment "MyCoLive" dengan variables:
- `base_url`: `http://localhost:3000`
- `access_token`: (kosong dulu, akan di-update otomatis setelah login)

---

## 📦 Collection JSON

```json
{
  "info": {
    "name": "MyCoLive API",
    "description": "Backend API untuk manajemen kos-kosan",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    { "key": "base_url", "value": "http://localhost:3000", "type": "string" },
    { "key": "access_token", "value": "", "type": "string" }
  ],
  "item": [
    {
      "name": "1. Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"login\": \"admin@mycolive.com\",\n  \"password\": \"admin123\"\n}" }
          }
        },
        {
          "name": "Register Penghuni",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/register",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"username\": \"penghuni_baru\",\n  \"nama\": \"Penghuni Baru\",\n  \"email\": \"penghuni@test.com\",\n  \"no_telepon\": \"081234567890\",\n  \"password\": \"password123\"\n}" }
          }
        },
        {
          "name": "Me",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/auth/me",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "2. Katalog (Public)",
      "item": [
        {
          "name": "Get All Katalog",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/katalog"
          }
        },
        {
          "name": "Get Katalog Detail",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/katalog/:id"
          }
        }
      ]
    },
    {
      "name": "3. Users (PEMILIK)",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/users",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Create User/Operator",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/users",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"username\": \"operator1\",\n  \"nama\": \"Operator Satu\",\n  \"email\": \"operator1@test.com\",\n  \"password\": \"password123\",\n  \"role\": \"PENGELOLA\",\n  \"properti_ids\": []\n}" }
          }
        }
      ]
    },
    {
      "name": "4. Properti (PEMILIK/PENGELOLA)",
      "item": [
        {
          "name": "Get All Properti",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/properti",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Create Properti",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/properti",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"nama\": \"Kost Melati\",\n  \"alamat\": \"Jl. Merdeka No.123\",\n  \"jenis\": \"CAMPUR\",\n  \"deskripsi\": \"Kost strategis\"\n}" }
          }
        }
      ]
    },
    {
      "name": "5. Tempat Pembayaran (PEMILIK)",
      "item": [
        {
          "name": "Get Settings",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/tempatpembayaran",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Update Settings",
          "request": {
            "method": "PUT",
            "url": "{{base_url}}/api/tempatpembayaran",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"nama_rekening\": \"John Doe\",\n  \"nomor_rekening\": \"1234567890\",\n  \"bank\": \"BCA\",\n  \"qris_image\": \"\"\n}" }
          }
        }
      ]
    },
    {
      "name": "6. Pemesanan",
      "item": [
        {
          "name": "Get My Pemesanan (PENGHUNI)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/pemesanan/my",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Get All Pemesanan (PEMILIK)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/pemesanan",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "7. Pengajuan Dana (PENGELOLA/PEMILIK)",
      "item": [
        {
          "name": "Get My Dana",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/dana/my",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Get All Dana (PEMILIK)",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/dana",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Create Dana",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/dana",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"tujuan\": \"Perbaikan WC\",\n  \"jumlah\": 500000,\n  \"no_rekening\": \"1234567890\",\n  \"properti_id\": \"PROPERTI_ID\"\n}" }
          }
        }
      ]
    },
    {
      "name": "8. Komplain (PENGHUNI/PEMILIK)",
      "item": [
        {
          "name": "Get My Komplain",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/komplain/my",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Get All Komplain",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/komplain",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        },
        {
          "name": "Create Komplain",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/komplain",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"masalah\": \"WC rusak\",\n  \"jenis\": \"FASILITAS\",\n  \"deskripsi\": \"WC tidak bisa flush\",\n  \"properti_id\": \"PROPERTI_ID\"\n}" }
          }
        }
      ]
    },
    {
      "name": "9. Laporan Keuangan (PEMILIK)",
      "item": [
        {
          "name": "Get Laporan",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/laporan/keuangan?bulan=2026-04",
            "header": [{ "key": "Authorization", "value": "Bearer {{access_token}}" }]
          }
        }
      ]
    },
    {
      "name": "10. WhatsApp Broadcast (PEMILIK)",
      "item": [
        {
          "name": "Send Broadcast",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/whatsapp/broadcast",
            "header": [
              { "key": "Authorization", "value": "Bearer {{access_token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"nomor\": [\"6281234567890\"],\n  \"pesan\": \"Halo dari MyCoLive\"\n}" }
          }
        }
      ]
    }
  ]
}
```

---

## 🔧 Cara Menggunakan

1. **Import** JSON di atas ke Postman
2. **Buat Environment** "MyCoLive" dengan:
   - `base_url` = `http://localhost:3000`
   - `access_token` = (kosong)
3. **Test Login dulu** - copy `access_token` dari response ke environment variable
4. **Run test** satu-satu sesuai urutan

---

## 📝 Notes

- Ganti `PROPERTI_ID` dengan ID yang valid dari response `/api/properti`
- Token dari login expires dalam 15 menit
- Refresh token bisa pakai `/api/auth/refresh`

---

Happy Testing! 🚀