# Deploy MyCoLive via Docker Hub

Metode paling simpel: **build di laptop, push ke Docker Hub, VPS cuma pull**.

```
Laptop                    Docker Hub                VPS (Ubuntu)
  │                          │                        │
  ├─ docker compose build ──►│                        │
  ├─ docker compose push ───►│                        │
  │                          ├──────────────────────► ├─ docker compose pull
  │                          │                        ├─ docker compose up -d
  │                          │                        └─ 🟢 ready
```

VPS gak perlu install Bun, Node, atau tools build — cukup Docker.

---

## 1. Prasyarat

| Item | Keterangan |
|------|-----------|
| **Akun Docker Hub** | Daftar gratis di [hub.docker.com](https://hub.docker.com) |
| **VM** | Ubuntu 22.04/24.04, IP publik, port 80 terbuka |
| **SSH** | Akses root/sudo ke VM |
| **Project** | MyCoLive lengkap di laptop |

---

## 2. Setup VPS — Install Docker

SSH ke VPS:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg ufw

# Repo Docker resmi
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

# Biar gak perlu sudo
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
nano .env
```

Isi:

```env
POSTGRES_USER=mycolive
POSTGRES_PASSWORD=<ganti-password-kuat>
POSTGRES_DB=comprodb
JWT_SECRET=<generate-pake-openssl-rand -base64 32>
WHATSAPP_PROVIDER=
WHATSAPP_API_KEY=
WHATSAPP_CHANNEL_ID=
NEXT_PUBLIC_API_URL=http://<IP-VM>
```

---

## 4. Build & Push dari Laptop

Buka terminal di laptop (folder project):

```bash
# Login ke Docker Hub (sekali)
docker login

# Build + push backend
export DOCKER_USER=<username-docker-hub>
docker compose -f docker-compose.prod.yml build backend
docker compose -f docker-compose.prod.yml push backend

# Build + push frontend
docker compose -f docker-compose.prod.yml build frontend
docker compose -f docker-compose.prod.yml push frontend
```

Atau build semua sekaligus:

```bash
export DOCKER_USER=<username-docker-hub>
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml push
```

> **Satu kali doang.** Update berikutnya tinggal ulang step ini.

---

## 5. Deploy di VPS

SSH ke VPS:

```bash
cd ~/mycolive

export DOCKER_USER=<username-docker-hub>
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Cek status:

```bash
docker compose -f docker-compose.prod.yml ps
# Semua harus "Up" atau "healthy"
```

---

## 6. Inisialisasi Database

Pertama kali aja:

```bash
cd ~/mycolive
docker compose -f docker-compose.prod.yml exec backend bun run db:push
docker compose -f docker-compose.prod.yml exec backend bun run db:seed
```

Admin default:
- **Email**: `admin@mycolive.com`
- **Password**: `admin123`

---

## 7. Verifikasi

```bash
# Dari VPS
curl http://localhost/
curl http://localhost/api/auth/login

# Atau dari browser
# http://<IP-VM>/
```

---

## 8. Update Code (Selanjutnya)

**Laptop:**

```bash
# Pull changes, rebuild, push
git pull
export DOCKER_USER=<username-docker-hub>
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml push
```

**VPS:**

```bash
cd ~/mycolive
export DOCKER_USER=<username-docker-hub>
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Selesai. Cuma 2 baris di sisi VPS.

---

## 9. Maintenance & Troubleshooting

Lihat `DEPLOY_MANUAL.md` bagian maintenance (log, backup, restart) — sama persis caranya.
