# syntax=docker/dockerfile:1.7
# ---------- Stage 1: deps ----------
FROM oven/bun:1.1.42-alpine AS deps

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# ---------- Stage 2: build ----------
FROM oven/bun:1.1.42-alpine AS build

WORKDIR /app

# Prisma butuh libssl untuk engine binary
RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bunx prisma generate

# ---------- Stage 3: runtime ----------
FROM oven/bun:1.1.42-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache openssl curl

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:3000/ || exit 1

CMD ["bun", "run", "src/index.ts"]