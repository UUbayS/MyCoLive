# Deploy MyCoLive — Pilih Metode

Arsitektur sama untuk semua cara:

```
Caddy (:80)
├─ /api/*  → backend:3000
└─ /*       → frontend:3000

backend  frontend  db (postgres:16) + volume pgdata
```

Pilih yang paling cocok:

---

## 🔹 [Docker Hub (Recommended)](./DEPLOY_DOCKERHUB.md)

Paling simpel. Build di laptop, push ke Docker Hub, VPS cuma pull.

```
Laptop: build → push
VPS:    pull → up -d     ← cuma 2 baris
```

**Cocok untuk**: hampir semua situasi. Build cepet (pake laptop), VPS gak berat.

---

## 🔹 [Manual (build langsung di VPS)](./DEPLOY_MANUAL.md)

Upload project ke VPS, build & jalanin langsung di situ.

```
VPS: git pull → docker compose up -d --build
```

**Cocok untuk**: VPS spek lumayan, males push/pull ke registri. Tapi build pertama bisa 5-15 menit.

---

## 🔹 [CI/CD + GHCR](./DEPLOY_GHCR.md)

Push ke GitHub → otomatis build & deploy ke VPS.

```
Git push → GitHub Actions → GHCR → VPS
```

**Cocok untuk**: tim > 1 orang, pingin fully automated. Tapi setup GitHub Secrets lumayan ribet.

---

## Referensi

| File | Fungsi |
|------|--------|
| `docker-compose.prod.yml` | Buat deploy production (pake `DOCKER_USER`) |
| `docker-compose.yml` | Buat development lokal |
| `Caddyfile` | Reverse proxy Caddy |
| `.env.example` | Template environment variables |
