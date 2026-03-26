FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile

# Generate Prisma client
RUN bunx prisma generate

# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate
RUN bun run build

# Production
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./

# Run migrations and start
EXPOSE 3000
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run .output/server/index.mjs"]
