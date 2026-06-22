# Panduan Deploy MyCoLive ke VM Ubuntu

Panduan ini mengasumsikan:
- **OS**: Ubuntu 22.04 atau 24.04
- **Akses publik**: via IP address (tanpa domain, tanpa HTTPS)
- **Arsitektur**: 1 VM, semua service jalan di Docker Compose

---

## Arsitektur

```
Internet (http://<IP-VM>:80)
        │
        ▼
┌──────────────────────────────┐
│  Caddy (:80)                 │   reverse proxy
│  - /api/* → backend:3000     │
│  - /*      → frontend:3000   │
└──────────────────────────────┘
        │             │
        ▼             ▼
┌──────────────┐  ┌──────────────────┐
│  frontend    │  │  backend         │
│  (Next.js)   │  │  (Bun + Hono)    │
│  :3000       │  │  :3000           │
└──────────────┘  └──────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  postgres:16    │
                │  :5432          │
                │  + volume       │
                └─────────────────┘
```

Backend, frontend, postgres, dan Caddy berjalan dalam satu jaringan Docker internal. Caddy adalah satu-satunya service yang暴露 port ke host.

---

## 0. Prasyarat di sisi laptop

- Sudah punya akun VM (provider apa pun: AWS EC2, DigitalOcean, Vultr, GCP, Azure, IDCloudHost, dsb.)
- VM sudah dibuat dengan **Ubuntu 22.04/24.04 LTS**
- VM punya **IP publik statis** (atau setidaknya IP publik tetap)
- Port **80** di security group / firewall VM sudah dibuka ke `0.0.0.0/0`
- Akses SSH ke VM (user dengan `sudo`)
- File project MyCoLive ada di laptop

---

## 1. Install Docker di VM

SSH ke VM dulu:

```bash
ssh user@<IP-VM>
```

### 1.1 Update & install prasyarat

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg ufw
```

### 1.2 Tambahkan repo resmi Docker

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
```

### 1.3 Install Docker Engine + Compose plugin

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
```

### 1.4 Verifikasi

```bash
docker --version
docker compose version
```

### 1.5 (Opsional tapi recommended) Jalankan Docker tanpa sudo

```bash
sudo usermod -aG docker $USER
newgrp docker
docker ps
```

Kalau `docker ps` jalan tanpa `sudo`, berarti berhasil.

### 1.6 Buka firewall untuk HTTP

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
```

---

## 2. Upload kode project ke VM

**Pilih salah satu** cara:

### Cara A: SCP (langsung upload dari laptop)

Dari laptop, buka terminal di **luar** folder project:

```bash
scp -r MyCoLive user@<IP-VM>:~/apps/
```

### Cara B: Git (lebih rapi kalau mau maintenance)

1. Push project ke GitHub/GitLab (privat).
2. Di VM:

```bash
cd ~
git clone https://github.com/<user>/<repo>.git apps
cd apps
```

### Cara C: rsync (untuk update incremental nanti)

```bash
rsync -avz --exclude 'node_modules' --exclude '.next' \
  ./MyCoLive/ user@<IP-VM>:~/apps/
```

---

## 3. Konfigurasi environment production

### 3.1 Masuk ke folder project

```bash
cd ~/apps/MyCoLive
```

### 3.2 Generate JWT_SECRET yang kuat

```bash
openssl rand -base64 32
```

Salin outputnya.

### 3.3 Buat file `.env`

```bash
cp .env.example .env
nano .env
```

Isi nilainya:

```env
POSTGRES_USER=mycolive
POSTGRES_PASSWORD=PasswordKuat123!GantiIni
POSTGRES_DB=comprodb
JWT_SECRET=<paste-hasil-openssl-rand>
WHATSAPP_PROVIDER=
WHATSAPP_API_KEY=
WHATSAPP_CHANNEL_ID=
NEXT_PUBLIC_API_URL=http://<IP-VM-KAMU>
```

**Catatan**:
- `POSTGRES_PASSWORD` — ganti dengan password kuat
- `JWT_SECRET` — pakai hasil dari step 3.2
- `NEXT_PUBLIC_API_URL` — pakai IP publik VM, **http** (bukan https)
- `WHATSAPP_*` — kosongkan kalau belum mau pakai broadcast WA

Simpan: `Ctrl+O`, `Enter`, `Ctrl+X`.

---

## 4. Build & jalankan

### 4.1 Bangun image & jalankan container

```bash
docker compose up -d --build
```

Proses build pertama kali butuh waktu 5-15 menit (tergantung spek VM & koneksi internet).

### 4.2 Pantau log

```bash
docker compose logs -f
```

Tekan `Ctrl+C` untuk keluar dari tail (container tetap jalan).

Lihat status per-service:

```bash
docker compose ps
```

Tunggu sampai semua service `healthy`:
- `mycolive-db` — postgres siap
- `mycolive-backend` — Bun + Hono merespons
- `mycolive-frontend` — Next.js merespons
- `mycolive-caddy` — reverse proxy siap

---

## 5. Inisialisasi database

### 5.1 Push schema ke database

```bash
docker compose exec backend bun run db:push
```

### 5.2 Seed admin pertama

```bash
docker compose exec backend bun run db:seed
```

Output akan menampilkan kredensial admin default:
- **Email**: `admin@mycolive.com`
- **Password**: `admin123`

⚠️ **Segera ganti password** setelah login pertama!

---

## 6. Verifikasi

### 6.1 Cek endpoint backend

```bash
curl http://<IP-VM>/
curl http://<IP-VM>/api/auth/login
```

### 6.2 Buka di browser

Akses:

```
http://<IP-VM>/
```

Seharusnya muncul halaman utama MyCoLive.

### 6.3 Login admin

Buka `/auth/login`, login dengan kredensial di atas.

---

## 7. Maintenance

### Lihat log

```bash
docker compose logs -f                  # semua service
docker compose logs -f backend          # backend saja
docker compose logs --tail=100 frontend # 100 baris terakhir frontend
```

### Restart service

```bash
docker compose restart backend
docker compose restart frontend
```

### Stop semua

```bash
docker compose down
```

Data Postgres tetap tersimpan di volume `pgdata`.

### Update kode & redeploy

```bash
cd ~/apps/MyCoLive
git pull                                # atau scp ulang
docker compose up -d --build
```

### Backup database

```bash
# Load env vars dari .env dulu, lalu backup
set -a && source .env && set +a
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup_$(date +%F).sql
```

### Restore database

```bash
# Load env vars, lalu restore
set -a && source .env && set +a
cat backup_2026-06-18.sql | docker compose exec -T db psql -U "$POSTGRES_USER" "$POSTGRES_DB"
```

### Hapus semua (termasuk data)

```bash
docker compose down -v
```

⚠️ `down -v` menghapus volume Postgres. Data hilang permanen.

---

## 8. Troubleshooting

### 8.1 Frontend tidak bisa hit backend

**Gejala**: Network error / CORS error di browser console.

**Fix**:
1. Pastikan `NEXT_PUBLIC_API_URL` di `.env` benar (IP VM, http)
2. Redeploy frontend setelah ubah env:
   ```bash
   docker compose up -d --build frontend
   ```
3. Cek log:
   ```bash
   docker compose logs frontend
   ```

### 8.2 Backend crash / restart loop

**Cek log**:

```bash
docker compose logs backend --tail=200
```

**Penyebab umum**:
- `DATABASE_URL` salah → cek di `.env`
- Postgres belum siap → backend seharusnya `depends_on` db, tunggu
- `JWT_SECRET` kosong → backend Bun akan error

### 8.3 Port 80 sudah dipakai

```bash
sudo lsof -i :80
```

Matikan service yang konflik (kalau ada `apache2` / `nginx` bawaan):

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### 8.4 Build gagal: `prisma generate` error

```bash
docker compose build --no-cache backend
```

### 8.5 Koneksi database ditolak

```bash
docker compose exec db pg_isready -U ${POSTGRES_USER:-mycolive}
```

Kalau tidak ready, restart db:

```bash
docker compose restart db
```

### 8.6 Error P1000: Authentication failed (password mismatch)

**Gejala**: Backend restart loop dengan log `Error: P1000: Authentication failed against database server`.

**Penyebab**: Password di `.env` berbeda dengan yang tersimpan di PostgreSQL. Ini terjadi kalau `.env` diubah setelah container `db` pertama kali dibuat — password tersimpan di volume `pgdata` dan tidak otomatis sinkron.

**Fix A — Reset total (data hilang)**:

```bash
docker compose down -v
docker compose up -d --build
```

Flag `-v` menghapus volume `pgdata`. DB akan dibuat ulang dengan password dari `.env` saat ini.

**Fix B — Reset password DB (data aman)**:

```bash
docker compose exec db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "ALTER USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';"
```

### 8.7 Disk penuh

```bash
docker system df
docker system prune -a   # hapus image/container tak terpakai (HATI-HATI)
docker volume prune      # hapus volume orphan
```

---

## 9. Checklist keamanan dasar

Karena ini exposed ke internet via HTTP (tanpa TLS), lakukan minimal ini:

- [ ] Ganti password admin default **segera** setelah login pertama
- [ ] Ganti `POSTGRES_PASSWORD` di `.env` dengan password kuat acak
- [ ] Generate `JWT_SECRET` baru dengan `openssl rand -base64 32`
- [ ] Jangan commit file `.env` ke git (sudah ada di `.gitignore`)
- [ ] Update `apt` rutin: `sudo apt update && sudo apt upgrade -y`
- [ ] Aktifkan SSH key-only login, disable password login
- [ ] Pertimbangkan pakai Cloudflare di depan (proxy gratis + TLS otomatis)
- [ ] Backup database rutin (lihat section 7)

---

## 10. (Opsional) Tambahkan HTTPS pakai Cloudflare

Kalau nanti punya domain dan ingin HTTPS tanpa setup cert manual:

1. Beli domain / pakai yang sudah ada
2. Daftarkan domain di Cloudflare (free plan cukup)
3. Arahkan `A record` ke IP VM
4. Set di Cloudflare: **Proxy status = Proxied** (oranye)
5. Set **SSL/TLS mode = Full** di Cloudflare
6. Ubah Caddy ke mode HTTPS (atau biarkan HTTP, Cloudflare terminate TLS)

Tapi ini di luar scope panduan ini. Untuk tugas kuliah, HTTP via IP sudah cukup.
