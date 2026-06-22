#!/bin/sh
set -e

echo "=== MyCoLive Backend Entrypoint ==="

echo "Running database migrations..."
bun run db:migrate:deploy

echo "Starting application..."
exec bun run start
