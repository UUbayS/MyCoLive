# Sync DB

## Tambahan
Kolom `bukti_transfer` di tabel `PengajuanDana`

## Run
Setelah git pull, sync schema ke database:

**Docker**
```bash
docker compose up -d --build
docker compose exec backend bunx prisma db push
```

**Tanpa Docker**
```bash
cd backend
bunx prisma db push
```
