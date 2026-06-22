# Panduan Deploy MyCoLive — CI/CD + GitHub Container Registry

Panduan ini menggunakan **GitHub Actions** + **GHCR (GitHub Container Registry)** untuk build & deploy otomatis ke VPS.

**Alur kerja**:
1. Push code ke GitHub → GitHub Actions build image Docker
2. Image dikirim ke GHCR (registri container GitHub)
3. GitHub Actions SSH ke VPS → pull image terbaru → restart container

> Tanpa CI/CD? Gunakan `docker-compose.yml` (build lokal) dan ikuti langkah manual di bagian Setup VPS + Inisialisasi DB.

---

## Arsitektur

```
┌─ Laptop ─────────────────────────────────────┐
│  git push origin deployment                   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌─ GitHub Actions ─────────────────────────────┐
│  .github/workflows/deploy.yml                │
│                                               │
│  1. Build backend  ──► ghcr.io/.../backend   │
│  2. Build frontend ──► ghcr.io/.../frontend  │
│  3. SSH ke VPS ──────► docker compose up -d  │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌─ VPS (Ubuntu) ───────────────────────────────┐
│                                                │
│  Caddy (:80)                                  │
│  ├─ /api/*  → backend:3000                    │
│  └─ /*       → frontend:3000                  │
│                                                │
│  backend  frontend  db (postgres:16)          │
│  (GHCR image) (GHCR image)  + volume pgdata   │
└────────────────────────────────────────────────┘
```

Semua service dalam 1 jaringan Docker internal. Hanya Caddy yang expose port `80` ke host.

---

## 1. Prasyarat

| Item | Keterangan |
|------|-----------|
| **VM** | Ubuntu 22.04/24.04 LTS, IP publik statis, port 80 terbuka |
| **SSH** | Akses root/sudo ke VM, sudah key-based login |
| **GitHub** | Repo sudah di-push ke GitHub (public/private) |
| **Project** | File MyCoLive lengkap di laptop |

---

## 2. Setup VPS — Install Docker

SSH ke VPS lalu jalankan:

```bash
# Update & prasyarat
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg ufw

# Tambah repo Docker resmi
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

# Install Docker Engine + Compose
sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

# (Opsional) biar bisa docker tanpa sudo
sudo usermod -aG docker $USER
newgrp docker

# Verifikasi
docker --version
docker compose version
```

### Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
```

---

## 3. Setup VPS — Folder & .env

Masih di VPS, siapkan folder dan file konfigurasi:

```bash
# Buat folder project
mkdir -p ~/mycolive && cd ~/mycolive

# Generate JWT secret
openssl rand -base64 32
# Salin outputnya, nanti dipakai di .env
```

Buat file `.env`:

```bash
nano .env
```

Isi dengan:

```env
POSTGRES_USER=mycolive
POSTGRES_PASSWORD=<ganti-password-kuat>
POSTGRES_DB=comprodb
JWT_SECRET=<paste-hasil-openssl-rand>
WHATSAPP_PROVIDER=
WHATSAPP_API_KEY=
WHATSAPP_CHANNEL_ID=
NEXT_PUBLIC_API_URL=http://<IP-VM-KAMU>
```

Simpan: `Ctrl+O`, `Enter`, `Ctrl+X`.

> **⚠️ File `.env` ini cuma ada di VPS, jangan di-commit ke GitHub.**

---

## 4. Setup GitHub Repository

### 4.1 Push project ke GitHub

Di laptop, dari folder project:

```bash
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
git checkout -b deployment
git push -u origin deployment
```

### 4.2 Buat Personal Access Token (PAT) untuk GHCR

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik **Generate new token (classic)**
3. Beri nama, misal `GHCR_DEPLOY`
4. Scope: centang **`write:packages`** dan **`read:packages`**
5. Generate, salin tokennya (hanya muncul sekali!)

### 4.3 Buat GitHub Secrets

Buka repo GitHub → **Settings → Secrets and variables → Actions → New repository secret**.

Buat 6 secrets berikut:

| Secret | Isi |
|--------|-----|
| `GHCR_TOKEN` | PAT dari langkah 4.2 (token yang dimulai `ghp_...`) |
| `VPS_HOST` | IP publik VPS, contoh `103.xxx.xxx.xxx` |
| `VPS_USER` | User SSH, biasanya `root` |
| `VPS_SSH_KEY` | **Seluruh isi** file private key SSH (`cat ~/.ssh/id_rsa` atau `id_ed25519`), termasuk baris `-----BEGIN...-----` dan `-----END...-----` |
| `VPS_PORT` | Port SSH, isi `22` (atau port kustom) |
| `NEXT_PUBLIC_API_URL` | Sama seperti di `.env`, contoh `http://103.xxx.xxx.xxx` |

Cara dapat `VPS_SSH_KEY` (dari laptop):

```bash
cat ~/.ssh/id_ed25519
# atau
cat ~/.ssh/id_rsa
```

Salin semua output (termasuk `-----BEGIN OPENSSH PRIVATE KEY-----` sampai `-----END OPENSSH PRIVATE KEY-----`), paste sebagai nilai secret `VPS_SSH_KEY`.

---

## 5. Deploy Pertama Kali

### 5.1 Trigger workflow

Ada 2 cara:

**Cara A — Push ke branch `deployment`**:

```bash
git add .
git commit -m "deploy: initial deployment"
git push origin deployment
```

**Cara B — Manual dari GitHub**:

1. Buka repo di GitHub
2. Tab **Actions** → klik **Build & Deploy**
3. Klik **Run workflow** → pilih branch `deployment` → **Run**

### 5.2 Pantau progress

1. Di GitHub: **Actions** → klik workflow yang sedang berjalan
2. Lihat 3 job: `build-and-push` (build backend & frontend) → `deploy` (SSH ke VPS)
3. Tunggu sampai semua hijau ✅

> Build pertama butuh ~5-15 menit, build berikutnya lebih cepat karena cache.

### 5.3 Inisialisasi database

Setelah workflow selesai, SSH ke VPS:

```bash
cd ~/mycolive

# Push schema ke database
docker compose -f docker-compose.prod.yml exec backend bun run db:push

# Seed admin pertama
docker compose -f docker-compose.prod.yml exec backend bun run db:seed
```

Output akan menampilkan kredensial admin:
- **Email**: `admin@mycolive.com`
- **Password**: `admin123`

---

## 6. Verifikasi

### 6.1 Cek dari VPS

```bash
# Status semua container
docker compose -f docker-compose.prod.yml ps

# Cek endpoint
curl http://localhost/
curl http://localhost/api/auth/login
```

### 6.2 Cek dari browser

Buka `http://<IP-VM>/` — harusnya muncul halaman MyCoLive.

Login di `/auth/login` dengan kredensial admin di atas.

> ⚠️ **Segera ganti password admin** setelah login pertama.

---

## 7. Update Code (Daily Workflow)

### Update biasa — cukup push

```bash
# Di laptop
git add .
git commit -m "fix: perbaiki something"
git push origin deployment
```

GitHub Actions otomatis:
1. Build ulang image backend & frontend
2. Push ke GHCR (tag `latest` + `sha-xxx`)
3. SSH ke VPS → pull & restart

**Data Postgres tetap aman** — cuma container backend & frontend yang diganti.

### Update .env di VPS

Kalau ada perubahan `.env` (ganti password DB, JWT secret, dll):

```bash
# Di VPS
cd ~/mycolive
nano .env

# Restart stack biar apply
docker compose -f docker-compose.prod.yml up -d
```

### Rollback ke versi sebelumnya

```bash
# Di VPS — lihat tag yang tersedia
docker image ls ghcr.io/<username>/<repo>-backend

# Rollback ke commit tertentu
export BACKEND_IMAGE=ghcr.io/<username>/<repo>-backend:sha-<commit>
export FRONTEND_IMAGE=ghcr.io/<username>/<repo>-frontend:sha-<commit>
docker compose -f docker-compose.prod.yml up -d
```

---

## 8. Maintenance

### Lihat log

```bash
docker compose -f docker-compose.prod.yml logs -f              # semua
docker compose -f docker-compose.prod.yml logs -f backend      # backend saja
docker compose -f docker-compose.prod.yml logs --tail=100 frontend
```

### Restart service tertentu

```bash
docker compose -f docker-compose.prod.yml restart backend
docker compose -f docker-compose.prod.yml restart frontend
```

### Stop semua

```bash
docker compose -f docker-compose.prod.yml down
```

### Backup database

```bash
set -a && source .env && set +a
docker compose -f docker-compose.prod.yml exec -T db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup_$(date +%F).sql
```

### Restore database

```bash
set -a && source .env && set +a
cat backup_2026-06-18.sql | \
  docker compose -f docker-compose.prod.yml exec -T db \
  psql -U "$POSTGRES_USER" "$POSTGRES_DB"
```

### Hapus semua (termasuk data)

```bash
docker compose -f docker-compose.prod.yml down -v
```

⚠️ **Data hilang permanen.**

---

## 9. Troubleshooting

### 9.1 Workflow gagal di job `build-and-push`

Buka GitHub **Actions** → klik workflow terakhir → cek log merah.

Penyebab umum:
- `NEXT_PUBLIC_API_URL` tidak di-set di secrets → tambahkan
- Ada syntax error di kode → fix & push ulang

### 9.2 Workflow gagal di job `deploy`

**"Permission denied (publickey)"** → `VPS_SSH_KEY` salah:
1. Pastikan public key VPS terdaftar di `~/.ssh/authorized_keys`
2. Generate ulang: `ssh-keygen -t ed25519` di laptop, lalu `ssh-copy-id user@<IP-VM>`
3. Update secret `VPS_SSH_KEY`

**"Host key verification failed"** → SSH host key berubah:
- Tambahkan `accept_new: true` di workflow, atau
- SSH manual sekali: `ssh user@<IP-VM>` & jawab `yes`

### 9.3 Container restart-loop

```bash
# Di VPS
docker compose -f docker-compose.prod.yml logs backend --tail=50
```

Penyebab umum:
- `DATABASE_URL` salah → cek `.env`
- `JWT_SECRET` kosong → isi di `.env`
- Postgres belum siap → tunggu, cek `docker compose ps`

### 9.4 Port 80 sudah dipakai (Apache/Nginx bawaan)

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
# atau
sudo systemctl stop nginx
sudo systemctl disable nginx
```

### 9.5 Error P1000 — password DB mismatch

Terjadi kalau `.env` diubah setelah container `db` pertama dibuat.

**Reset password (data aman)**:

```bash
cd ~/mycolive
set -a && source .env && set +a
docker compose -f docker-compose.prod.yml exec db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  -c "ALTER USER \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD';"
```

**Reset total (data hilang)**:

```bash
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml up -d
# lalu seed ulang
```

### 9.6 Disk penuh

```bash
docker system df
docker system prune -a -f   # hapus semua image/container tak terpakai
docker volume prune -f      # hapus volume orphan
```

### 9.7 Caddy error di log

```bash
docker compose -f docker-compose.prod.yml logs caddy
```

Cek syntax Caddyfile:
```bash
docker compose -f docker-compose.prod.yml exec caddy caddy validate --config /etc/caddy/Caddyfile
```

---

## 10. Security Checklist

- [ ] Ganti password admin default **segera setelah deploy**
- [ ] `POSTGRES_PASSWORD` pakai password kuat (min 16 karakter, campur simbol)
- [ ] `JWT_SECRET` di-generate dengan `openssl rand -base64 32`
- [ ] File `.env` **tidak** di-commit ke git (sudah di `.gitignore`)
- [ ] SSH key-only login, disable password login
- [ ] `sudo apt update && sudo apt upgrade -y` rutin di VPS
- [ ] Backup database rutin (lihat section 8)
- [ ] PAT `GHCR_TOKEN` pakai **minimal scope** (`read:packages` aja untuk VPS)

---

## 11. (Opsional) HTTPS via Cloudflare

1. Beli domain / pakai yang sudah ada
2. Daftarkan di Cloudflare (free plan)
3. Arahkan `A record` ke IP VM, set **Proxy = Proxied** (oranye)
4. Cloudflare SSL/TLS mode → **Full**
5. Caddy tetap HTTP di internal — Cloudflare yang terminate TLS

Untuk tugas kuliah, akses via HTTP + IP sudah cukup.

---

## Referensi File

| File | Fungsi |
|------|--------|
| `.github/workflows/deploy.yml` | Workflow GitHub Actions — build & push ke GHCR, deploy ke VPS |
| `docker-compose.prod.yml` | Docker Compose versi production (image dari GHCR) |
| `docker-compose.yml` | Docker Compose versi development (build lokal) |
| `Caddyfile` | Konfigurasi reverse proxy Caddy |
| `.env.example` | Template environment variables (+ catatan GitHub Secrets) |
