# Deploy MyCoLive — Manual (build langsung di VPS)

Metode paling mentah: **upload project ke VPS, build & jalankan langsung**.

Cocok buat:
- VPS spek lumayan (min 2GB RAM)
- Koneksi internet VPS stabil
- Gak mau ribet push/pull ke registri

---

## 1. Prasyarat

- VM Ubuntu 22.04/24.04, IP publik, port 80 terbuka
- SSH akses root/sudo

---

## 2. Install Docker

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg ufw

# Repo Docker
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

## 3. Upload Project ke VPS

**Pilih salah satu:**

### A. Git clone (recommended)

```bash
cd ~
git clone https://github.com/<username>/<repo>.git mycolive
cd mycolive
```

### B. SCP (dari laptop)

```bash
scp -r MyCoLive user@<IP-VM>:~/mycolive
```

---

## 4. Setup .env

```bash
cd ~/mycolive
cp .env.example .env
nano .env
```

Isi:

```env
POSTGRES_USER=mycolive
POSTGRES_PASSWORD=<ganti-password-kuat>
POSTGRES_DB=comprodb
JWT_SECRET=<openssl rand -base64 32>
WHATSAPP_PROVIDER=
WHATSAPP_API_KEY=
WHATSAPP_CHANNEL_ID=
NEXT_PUBLIC_API_URL=http://<IP-VM>
```

---

## 5. Build & Jalankan

```bash
docker compose up -d --build
```

Proses build pertama 5-15 menit (tergantung spek VM).

Cek status:

```bash
docker compose ps
# Semua service harus "Up" / "healthy"
```

---

## 6. Inisialisasi DB

```bash
docker compose exec backend bun run db:push
docker compose exec backend bun run db:seed
```

---

## 7. Verifikasi

```bash
curl http://localhost/
# atau buka http://<IP-VM>/ di browser
```

---

## 8. Update Code

```bash
cd ~/mycolive
git pull
docker compose up -d --build
```

---

## 9. Maintenance

### Log

```bash
docker compose logs -f            # semua
docker compose logs -f backend    # backend aja
docker compose logs --tail=50 backend
```

### Restart

```bash
docker compose restart backend
docker compose restart frontend
```

### Stop

```bash
docker compose down
```

### Backup DB

```bash
set -a && source .env && set +a
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup_$(date +%F).sql
```

### Restore DB

```bash
set -a && source .env && set +a
cat backup_2026-06-18.sql | docker compose exec -T db psql -U "$POSTGRES_USER" "$POSTGRES_DB"
```

### Reset total (data hilang)

```bash
docker compose down -v
```

---

## 10. Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Port 80 dipakai | `sudo systemctl stop apache2 nginx` |
| Backend restart loop | Cek `docker compose logs backend`, pastikan `.env` bener |
| P1000 auth failed | Password DB mismatch — `docker compose down -v` lalu `up -d` ulang |
| Disk penuh | `docker system prune -a -f` |

Lengkapnya cek [DEPLOY_DOCKERHUB.md](./DEPLOY_DOCKERHUB.md) bagian troubleshooting — sama aja.
