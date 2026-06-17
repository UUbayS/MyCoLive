# Dokumentasi Fitur MyCoLive

MyCoLive adalah aplikasi manajemen kos-kosan yang melayani tiga peran pengguna: **Pemilik**, **Pengelola**, dan **Penghuni**.

---

## A. Halaman Publik (Tanpa Login)

### 1. Homepage
- **Tujuan:** Halaman utama yang menampilkan informasi produk, katalog properti, dan ajakan untuk mendaftar atau login.
- **Langkah penggunaan:**
  1. Buka halaman utama (`/`).
  2. Lihat hero section, kartu fitur (Kelola Properti, Manajemen Penghuni, Laporan Keuangan), dan katalog properti.
  3. Klik **Masuk** untuk login atau **Daftar** untuk registrasi.

### 2. Login
- **Tujuan:** Autentikasi pengguna menggunakan email/nomor telepon dan password.
- **Langkah penggunaan:**
  1. Buka `/auth/login`.
  2. Masukkan email atau nomor telepon dan password.
  3. Klik **Masuk**. Sistem akan mengarahkan ke dashboard sesuai peran (Pemilik, Pengelola, atau Penghuni).

### 3. Registrasi
- **Tujuan:** Mendaftarkan akun baru sebagai Penghuni.
- **Langkah penggunaan:**
  1. Buka `/auth/register`.
  2. Isi formulir: username, nama lengkap, nomor telepon, email, dan password.
  3. Klik **Daftar**. Akun langsung login otomatis setelah registrasi berhasil.

### 4. Katalog Properti (Publik)
- **Tujuan:** Menampilkan detail satu properti beserta gambar, fasilitas, statistik, dan lokasi.
- **Langkah penggunaan:**
  1. Dari homepage, klik salah satu kartu properti.
  2. Halaman `/public/katalog-properti/[id]` menampilkan informasi lengkap properti.
  3. Klik **Lihat Kamar** untuk melihat daftar kamar, atau hubungi admin via WhatsApp.

### 5. Daftar Kamar (Publik)
- **Tujuan:** Melihat daftar kamar yang tersedia di suatu properti.
- **Langkah penggunaan:**
  1. Dari halaman detail properti, klik **Lihat Kamar**.
  2. Halaman `/public/katalog-properti/[id]/kamar` menampilkan semua kamar dengan status (KOSONG/TERISI).
  3. Gunakan fitur pencarian untuk mencari kamar tertentu.
  4. Klik salah satu kamar untuk melihat detail.

### 6. Detail Kamar (Publik)
- **Tujuan:** Menampilkan detail kamar dan opsi pemesanan.
- **Langkah penggunaan:**
  1. Dari daftar kamar, klik salah satu kamar.
  2. Halaman `/public/katalog-properti/[id]/kamar/[kamarId]` menampilkan foto, fasilitas, dan tarif sewa (1/3/6/12 bulan).
  3. Klik **Pesan** untuk melakukan booking (perlu login sebagai Penghuni).

### 7. Fasilitas (Publik)
- **Tujuan:** Melihat daftar fasilitas umum suatu properti.
- **Langkah penggunaan:**
  1. Dari halaman detail properti, klik **Fasilitas**.
  2. Halaman `/public/katalog-properti/[id]/fasilitas` menampilkan daftar fasilitas seperti WiFi, AC, dll.

### 8. Tentang
- **Tujuan:** Halaman informasi tentang MyCoLive.
- **Langkah penggunaan:**
  1. Buka `/tentang` dari footer atau navigasi.

### 9. Kontak
- **Tujuan:** Halaman kontak MyCoLive.
- **Langkah penggunaan:**
  1. Buka `/kontak` dari footer atau navigasi.

### 10. Kebijakan Privasi
- **Tujuan:** Menampilkan kebijakan privasi aplikasi.
- **Langkah penggunaan:**
  1. Buka `/kebijakan-privasi` dari footer.

### 11. Syarat & Ketentuan
- **Tujuan:** Menampilkan syarat dan ketentuan penggunaan.
- **Langkah penggunaan:**
  1. Buka `/syarat-ketentuan` dari footer.

---

## B. Fitur Penghuni (Tenant)

### 1. Kamar Saya
- **Tujuan:** Melihat detail kamar yang sedang disewa, informasi sewa, sisa hari, dan tindakan terkait sewa.
- **Langkah penggunaan:**
  1. Login sebagai Penghuni, buka `/penghuni/kamar-saya`.
  2. Lihat foto kamar, badge fasilitas, tanggal mulai & selesai sewa, hitung mundur sisa hari.
  3. Klik **Chat Admin** untuk menghubungi admin via WhatsApp.
  4. Klik **Ajukan Check-out** jika ingin mengakhiri sewa.
  5. Klik **Perpanjang Sewa** jika sisa hari kurang dari 30 hari.
  6. Notifikasi tagihan tertunda akan muncul jika ada pembayaran yang belum lunas.

### 2. Katalog Properti
- **Tujuan:** Menjelajahi katalog properti yang tersedia untuk disewa.
- **Langkah penggunaan:**
  1. Dari menu sidebar, klik **Katalog Properti**.
  2. Browse properti, lihat detail, dan cari kamar yang diinginkan.

### 3. Riwayat Transaksi
- **Tujuan:** Melihat semua riwayat pemesanan dan pembayaran.
- **Langkah penggunaan:**
  1. Buka `/penghuni/transaksi`.
  2. Lihat daftar semua booking dengan badge status: Menunggu, Diterima, Ditolak, Selesai, Dibatalkan.
  3. Lihat status pembayaran: Belum Bayar, Menunggu Verifikasi, Lunas, Ditolak.
  4. Klik salah satu transaksi untuk melihat detail.

### 4. Detail Transaksi
- **Tujuan:** Melihat detail transaksi dan mengunggah bukti pembayaran.
- **Langkah penggunaan:**
  1. Dari Riwayat Transaksi, klik salah satu transaksi.
  2. Halaman `/penghuni/transaksi/[id]` menampilkan informasi booking lengkap.
  3. Lihat instruksi pembayaran (rekening bank atau QRIS dari pengaturan admin).
  4. Klik **Unggah Bukti Pembayaran** dan pilih gambar bukti transfer.
  5. Tunggu admin memverifikasi pembayaran.

### 5. Komplain
- **Tujuan:** Mengajukan dan melacak keluhan terkait fasilitas, lingkungan, atau penghuni lain.
- **Langkah penggunaan:**
  1. Buka `/penghuni/komplain`.
  2. Klik **Tambah Komplain**, isi modal: pilih tipe (Fasilitas, Lingkungan, Penghuni Lain, Lainnya), tulis deskripsi, unggah foto (opsional).
  3. Lihat daftar komplain aktif dan riwayat dengan badge status (Menunggu, Diproses, Selesai).

### 6. Pesan Kamar
- **Tujuan:** Memesan kamar yang dipilih.
- **Langkah penggunaan:**
  1. Dari halaman detail kamar, klik **Pesan**.
  2. Halaman `/penghuni/pesan/[id]` menampilkan formulir: pilih durasi sewa (1/3/6/12 bulan), tanggal mulai, metode pembayaran (Transfer Bank / QRIS).
  3. Lihat total harga yang harus dibayar.
  4. Klik **Pesan Sekarang** untuk mengajukan booking.

### 7. Profil (Penghuni)
- **Tujuan:** Melihat dan mengedit data profil pribadi.
- **Langkah penggunaan:**
  1. Buka `/penghuni/profile`.
  2. Edit nama, email, atau nomor telepon.
  3. Klik **Ubah Password** untuk mengganti password.
  4. Klik **Logout** untuk keluar.

### 8. Notifikasi
- **Tujuan:** Melihat notifikasi dalam aplikasi.
- **Langkah penggunaan:**
  1. Buka `/penghuni/notifikasi`.
  2. Lihat daftar notifikasi dengan indikator sudah/belum dibaca.
  3. Klik notifikasi untuk menandai sudah dibaca.
  4. Klik **Tandai Semua Dibaca** untuk menandai seluruh notifikasi.

---

## C. Fitur Pengelola (Manager)

### 1. Properti Saya
- **Tujuan:** Melihat daftar properti yang ditugaskan kepada pengelola.
- **Langkah penggunaan:**
  1. Login sebagai Pengelola, buka `/pengelola/properti`.
  2. Lihat kartu properti yang ditugaskan.
  3. Klik properti untuk melihat dan mengelola kamar.

### 2. Kelola Kamar
- **Tujuan:** Melihat daftar kamar dalam properti yang dikelola.
- **Langkah penggunaan:**
  1. Dari Properti Saya, klik properti yang diinginkan.
  2. Halaman `/pengelola/properti/[id]/kamar` menampilkan semua kamar dengan status (KOSONG, TERISI, MAINTENANCE).
  3. Gunakan fitur pencarian kamar.
  4. Klik kamar untuk melihat detail.

### 3. Detail Kamar (Pengelola)
- **Tujuan:** Melihat dan mengedit informasi kamar.
- **Langkah penggunaan:**
  1. Dari daftar kamar, klik salah satu kamar.
  2. Halaman `/pengelola/properti/[id]/kamar/[kamarId]` menampilkan detail kamar: nomor, tipe, luas, fasilitas, deskripsi, tarif sewa, foto, status.
  3. Edit informasi sesuai kebutuhan.

### 4. Daftar Penghuni
- **Tujuan:** Melihat semua penghuni di properti yang dikelola.
- **Langkah penggunaan:**
  1. Buka `/pengelola/penghuni/daftar`.
  2. Lihat daftar penghuni dengan nama, email, kamar, tanggal sewa, badge status.
  3. Klik penghuni untuk melihat detail.

### 5. Detail Penghuni (Pengelola)
- **Tujuan:** Melihat detail profil dan sewa seorang penghuni.
- **Langkah penggunaan:**
  1. Dari Daftar Penghuni, klik salah satu penghuni.
  2. Halaman `/pengelola/penghuni/[id]` menampilkan profil penghuni, info kamar, dan periode sewa.

### 6. Komplain (Pengelola)
- **Tujuan:** Melihat dan menangani komplain dari penghuni.
- **Langkah penggunaan:**
  1. Buka `/pengelola/penghuni/komplain`.
  2. Lihat daftar komplain dengan status (Menunggu, Diproses, Selesai).
  3. Klik komplain untuk melihat detail.
  4. Ubah status ke **Diproses** saat mulai menangani, atau **Selesai** setelah terselesaikan.

### 7. Pengumuman (Pengelola)
- **Tujuan:** Mengirim pengumuman kepada penghuni.
- **Langkah penggunaan:**
  1. Buka `/pengelola/pengumuman`.
  2. Pilih target audiens.
  3. Tulis subjek dan isi pesan.
  4. Centang opsi **Kirim via WhatsApp** jika ingin mengirim ke WhatsApp juga.
  5. Klik **Kirim**.

### 8. Request Dana
- **Tujuan:** Mengajukan permintaan dana kepada pemilik.
- **Langkah penggunaan:**
  1. Buka `/pengelola/request-dana`.
  2. Klik **Ajukan Dana**.
  3. Isi formulir: pilih properti, tujuan penggunaan, jumlah dana, rekening bank, unggah foto pendukung (opsional).
  4. Klik **Ajukan**. Lacak status: Menunggu, Diterima, Ditolak.

### 9. Profil (Pengelola)
- **Tujuan:** Mengedit profil dan mengganti password.
- **Langkah penggunaan:**
  1. Buka `/pengelola/profile`.
  2. Edit nama, email, atau nomor telepon.
  3. Klik **Ubah Password** untuk mengganti password.
  4. Klik **Logout** untuk keluar.

### 10. Notifikasi (Pengelola)
- **Tujuan:** Melihat notifikasi dalam aplikasi.
- **Langkah penggunaan:**
  1. Buka `/pengelola/notifikasi`.
  2. Kelola notifikasi (baca, tandai semua dibaca).

---

## D. Fitur Pemilik (Owner)

### Properti

#### 1. Kelola Properti
- **Tujuan:** Mengelola (CRUD) semua properti yang dimiliki.
- **Langkah penggunaan:**
  1. Login sebagai Pemilik, buka `/administrator/properti`.
  2. Lihat ringkasan: total properti, total kamar, total kamar terisi.
  3. Klik **Tambah Properti** untuk menambah properti baru.
  4. Klik properti untuk melihat detail dan kamar.
  5. Klik **Edit** untuk mengubah data properti.
  6. Klik **Hapus** untuk menghapus properti.

#### 2. Tambah Properti
- **Tujuan:** Menambahkan properti baru ke dalam sistem.
- **Langkah penggunaan:**
  1. Dari Kelola Properti, klik **Tambah Properti**.
  2. Halaman `/administrator/properti/tambah` menampilkan formulir: nama, alamat (provinsi, kota, kecamatan, kode pos, detail), tipe (Laki-laki/Perempuan/Campur), deskripsi, kebijakan, foto, dan fasilitas umum.
  3. Isi semua data lalu klik **Simpan**.

#### 3. Edit Properti
- **Tujuan:** Mengubah data properti yang sudah ada.
- **Langkah penggunaan:**
  1. Dari Kelola Properti, klik ikon edit pada properti.
  2. Halaman `/administrator/properti/[id]/edit` menampilkan formulir yang sudah terisi.
  3. Ubah data yang diperlukan lalu klik **Simpan**.

#### 4. Detail Properti
- **Tujuan:** Melihat detail lengkap properti dan daftar kamar.
- **Langkah penggunaan:**
  1. Dari Kelola Properti, klik salah satu properti.
  2. Halaman `/administrator/properti/[id]` menampilkan info properti, statistik, dan daftar kamar.

#### 5. Kelola Kamar
- **Tujuan:** Melihat semua kamar dalam suatu properti.
- **Langkah penggunaan:**
  1. Dari Detail Properti, lihat daftar kamar.
  2. Halaman `/administrator/properti/[id]/kamar` menampilkan kamar dengan status (KOSONG, TERISI, MAINTENANCE).
  3. Gunakan fitur pencarian.
  4. Klik kamar untuk detail, atau klik **Tambah Kamar**.

#### 6. Tambah Kamar
- **Tujuan:** Menambahkan kamar baru ke properti.
- **Langkah penggunaan:**
  1. Dari Kelola Kamar, klik **Tambah Kamar**.
  2. Halaman `/administrator/properti/[id]/kamar/tambah` menampilkan formulir: nomor kamar, tipe (REGULER/VIP/STUDIO), luas, fasilitas ruangan, deskripsi, tarif sewa (1/3/6/12 bulan), dan foto.
  3. Isi semua data lalu klik **Simpan**.

#### 7. Edit Kamar
- **Tujuan:** Mengubah data kamar yang sudah ada.
- **Langkah penggunaan:**
  1. Dari daftar kamar, klik ikon edit pada kamar.
  2. Halaman `/administrator/properti/[id]/kamar/[kamarId]/edit` menampilkan formulir yang sudah terisi.
  3. Ubah data lalu klik **Simpan**.

#### 8. Detail Kamar (Pemilik)
- **Tujuan:** Melihat detail lengkap kamar.
- **Langkah penggunaan:**
  1. Dari Kelola Kamar, klik salah satu kamar.
  2. Halaman `/administrator/properti/[id]/kamar/[kamarId]` menampilkan informasi lengkap kamar.

#### 9. Kelola Fasilitas
- **Tujuan:** Mengelola daftar master fasilitas (umum dan ruangan).
- **Langkah penggunaan:**
  1. Buka `/administrator/fasilitas`.
  2. Toggle antara tab **Fasilitas Umum** (contoh: WiFi, Parkir) dan **Fasilitas Ruangan** (contoh: AC, TV).
  3. Klik **Tambah** untuk menambah nama fasilitas baru.
  4. Klik **Hapus** untuk menghapus fasilitas.

#### 10. Fasilitas Properti
- **Tujuan:** Melihat daftar fasilitas yang dimiliki suatu properti.
- **Langkah penggunaan:**
  1. Dari sidebar, navigasikan ke properti lalu pilih **Fasilitas**.
  2. Halaman `/administrator/properti/[id]/fasilitas` menampilkan daftar fasilitas properti tersebut.

---

### Penghuni

#### 11. Daftar Penghuni
- **Tujuan:** Melihat semua penghuni di seluruh properti.
- **Langkah penggunaan:**
  1. Buka `/administrator/penghuni/daftar`.
  2. Cari penghuni berdasarkan nama, email, atau nomor telepon.
  3. Filter berdasarkan status: Menyewa, Sewa Berakhir, Belum Menyewa, Pengajuan Checkout.
  4. Filter berdasarkan properti.
  5. Klik penghuni untuk melihat detail.

#### 12. Detail Penghuni (Pemilik)
- **Tujuan:** Melihat profil lengkap dan informasi sewa penghuni.
- **Langkah penggunaan:**
  1. Dari Daftar Penghuni, klik salah satu penghuni.
  2. Halaman `/administrator/penghuni/[id]` menampilkan profil, info kamar, periode sewa, dan status.

#### 13. Validasi Bayar
- **Tujuan:** Menyetujui atau menolak pemesanan masuk dari penghuni.
- **Langkah penggunaan:**
  1. Buka `/administrator/penghuni/validasi`.
  2. Gunakan tab filter: Semua, Menunggu, Terverifikasi, Ditolak.
  3. Klik salah satu pemesanan untuk melihat detail, profil penghuni, dan bukti pembayaran.
  4. Klik **Terima Pesanan** untuk menyetujui, atau **Tolak Pesanan** untuk menolak.

#### 14. Komplain (Pemilik)
- **Tujuan:** Melihat dan menyelesaikan komplain dari penghuni.
- **Langkah penggunaan:**
  1. Buka `/administrator/penghuni/komplain`.
  2. Lihat daftar komplain dengan status (Menunggu, Diproses, Selesai).
  3. Klik komplain untuk melihat detail.
  4. Ubah status ke **Diproses** atau **Selesai**.

#### 15. Pengumuman (Pemilik)
- **Tujuan:** Mengirim pengumuman massal kepada pengguna dengan opsi WhatsApp.
- **Langkah penggunaan:**
  1. Buka `/administrator/pengumuman`.
  2. Pilih target: Semua User, Semua Penghuni, Semua Pengelola, atau Penghuni di Properti Tertentu.
  3. Jika memilih properti tertentu, pilih properti yang dituju.
  4. Tulis subjek dan isi pesan.
  5. Centang **Kirim via WhatsApp** untuk broadcast WhatsApp (jika terhubung).
  6. Klik **Kirim**.

---

### Manajemen Keuangan

#### 16. Keuangan
- **Tujuan:** Dashboard keuangan lengkap dengan ringkasan, grafik tren, filter, pencarian, dan ekspor PDF.
- **Langkah penggunaan:**
  1. Buka `/administrator/keuangan`.
  2. Lihat kartu ringkasan: Total Bersih, Total Penghasilan, Total Pengeluaran.
  3. Filter berdasarkan properti (chip properti) dan periode (Bulan Ini / Tahun Ini / Custom Range dengan date picker).
  4. Lihat grafik tren (harian/bulanan/kuartalan) dengan agregasi yang bisa dipilih.
  5. Filter tipe transaksi: Semua, Pemasukan, Pengeluaran.
  6. Gunakan pencarian untuk mencari transaksi spesifik.
  7. Klik **Unduh PDF** untuk mengekspor laporan (Seluruh Transaksi, Income/Loss Harian, Bulanan, atau Tahunan).

#### 17. Kuitansi Detail
- **Tujuan:** Melihat detail satu kuitansi transaksi.
- **Langkah penggunaan:**
  1. Dari halaman Keuangan, klik salah satu transaksi.
  2. Halaman `/administrator/keuangan/kuitansi/[id]` menampilkan: nomor kuitansi, nama penghuni, properti, kamar, durasi, metode pembayaran, jumlah, tanggal bayar, dan bukti pembayaran.

---

### Operator

#### 18. Daftar Operator
- **Tujuan:** Melihat dan mengelola pengelola/operator properti.
- **Langkah penggunaan:**
  1. Buka `/administrator/operator/daftar`.
  2. Cari operator berdasarkan nama, email, atau telepon.
  3. Lihat daftar operator dengan properti yang ditugaskan.
  4. Klik operator untuk melihat detail.

#### 19. Tambah Operator
- **Tujuan:** Membuat akun pengelola/operator baru.
- **Langkah penggunaan:**
  1. Dari Daftar Operator, klik **Tambah Operator**.
  2. Halaman `/administrator/operator/tambah` menampilkan formulir: username, nama, email, telepon, password, dan pilih properti yang ditugaskan.
  3. Isi semua data lalu klik **Simpan**.

#### 20. Detail Operator
- **Tujuan:** Melihat profil operator dan properti yang dikelola.
- **Langkah penggunaan:**
  1. Dari Daftar Operator, klik salah satu operator.
  2. Halaman `/administrator/operator/[id]` menampilkan profil operator dan daftar properti yang ditugaskan.

#### 21. Request Dana (Pemilik)
- **Tujuan:** Menyetujui atau menolak permintaan dana dari pengelola.
- **Langkah penggunaan:**
  1. Buka `/administrator/operator/request`.
  2. Gunakan tab filter: Semua, Menunggu, Diterima, Ditolak.
  3. Klik permintaan untuk melihat detail: tujuan, jumlah, rekening bank, foto pendukung.
  4. Klik **Setujui** untuk menyetujui, atau **Tolak** untuk menolak.

---

### Profil & Pengaturan

#### 22. Profil (Pemilik)
- **Tujuan:** Mengedit profil, mengatur informasi pembayaran, dan menghubungkan WhatsApp.
- **Langkah penggunaan:**
  1. Buka `/administrator/profile`.
  2. **Edit Profil:** ubah nama, email, atau nomor telepon.
  3. **Ubah Password:** ganti password akun.
  4. **Informasi Pembayaran:** isi nama bank, nama pemilik rekening, nomor rekening, dan URL gambar QRIS — data ini akan ditampilkan ke penghuni saat melakukan pembayaran.
  5. **WhatsApp Integration:** klik **Hubungkan** untuk menghubungkan WhatsApp, scan kode QR yang muncul, klik **Refresh Status** untuk memeriksa status koneksi, atau **Putuskan** untuk memutus koneksi WhatsApp.
  6. Klik **Logout** untuk keluar.

#### 23. Notifikasi (Pemilik)
- **Tujuan:** Melihat notifikasi dalam aplikasi.
- **Langkah penggunaan:**
  1. Buka `/administrator/notifikasi`.
  2. Kelola notifikasi (baca, tandai semua dibaca).

---

## Ringkasan

| Peran | Jumlah Fitur |
|---|---|
| Publik | 11 |
| Penghuni | 8 |
| Pengelola | 10 |
| Pemilik | 23 |
| **Total** | **52** |
