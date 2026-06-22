# Deploy MyCoLive via CI/CD + GHCR

Panduan ini menggunakan **GitHub Actions** + **GHCR (GitHub Container Registry)** untuk build & deploy otomatis ke VPS.

**Alur kerja**:
1. Push code ke GitHub → GitHub Actions build image Docker
2. Image dikirim ke GHCR
3. GitHub Actions SSH ke VPS → pull image terbaru → restart container

---

## Arsitektur

```
Push ke main/deployment
        │
        ▼
┌─ GitHub Actions ─────────────────────────────┐
│  1. Build backend  ──► ghcr.io/.../backend   │
│  2. Build frontend ──► ghcr.io/.../frontend  │
│  3. SSH ke VPS ──────► docker compose up -d  │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌─ VPS (Ubuntu) ───────────────────────────────┐
│  Caddy (:80)                                  │
│  ├─ /api/*  → backend:3000                    │
│  └─ /*       → frontend:3000                  │
│                                                │
│  backend  frontend  db (postgres:16)          │
│  (GHCR)   (GHCR)     + volume pgdata          │
└────────────────────────────────────────────────┘
```

---

## 1. Prasyarat

| Item | Keterangan |
|------|-----------|
| **VM** | Ubuntu 22.04/24.04, IP publik, port 80 terbuka |
| **SSH** | Akses root/sudo, key-based login |
| **GitHub** | Repo sudah di-push ke GitHub |

---

## 2. Setup VPS — Install Docker

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg ufw

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER
newgrp docker
```

Firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
```

---

## 3. Setup VPS — Folder & .env

```bash
mkdir -p ~/mycolive && cd ~/mycolive

# Generate JWT
openssl rand -base64 32
# Salin outputnya

nano .env
```

Isi:

```env
POSTGRES_USER=mycolive
POSTGRES_PASSWORD=<ganti-password-kuat>
POSTGRES_DB=comprodb
JWT_SECRET=<paste-hasil-openssl-rand>
WHATSAPP_PROVIDER=
WHATSAPP_API_KEY=
WHATSAPP_CHANNEL_ID=
NEXT_PUBLIC_API_URL=http://<IP-VM>
```

---

## 4. Setup GitHub Secrets

Buka repo → **Settings → Secrets and variables → Actions → New repository secret**.

| Secret | Isi |
|--------|-----|
| `GHCR_TOKEN` | GitHub PAT classic, scope `read:packages` + `write:packages` |
| `VPS_HOST` | IP publik VPS |
| `VPS_USER` | User SSH (biasanya `root`) |
| `VPS_SSH_KEY` | Seluruh isi private key (`-----BEGIN...-----` sampai `-----END...-----`) |
| `VPS_PORT` | Port SSH (default `22`) |
| `NEXT_PUBLIC_API_URL` | `http://<IP-VM>` |

---

## 5. Deploy Pertama

Trigger workflow via push:

```bash
git push origin deployment
```

Atau manual: **Actions → Build & Deploy → Run workflow**.

Setelah workflow selesai (✅ hijau), SSH ke VPS:

```bash
cd ~/mycolive
docker compose -f docker-compose.prod.yml exec backend bun run db:push
docker compose -f docker-compose.prod.yml exec backend bun run db:seed
```

---

## 6. Verifikasi

```bash
curl http://localhost/
```
Buka `http://<IP-VM>/` di browser. Login: `admin@mycolive.com` / `admin123`.

---

## 7. Update Code

Cukup push ke `main` atau `deployment` — sisanya otomatis.

---

## 8. Troubleshooting

Lihat troubleshooting di [DEPLOY_DOCKERHUB.md](./DEPLOY_DOCKERHUB.md) — masalah container restart, port 80, P1000, dll sama persis.

## 9. File Terkait

| File | Fungsi |
|------|--------|
| `.github/workflows/deploy.yml` | Workflow GitHub Actions |
| `docker-compose.prod.yml` | Compose production (image dari registri) |
