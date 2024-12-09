FROM node:18-alpine AS base

ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}

FROM base AS deps
RUN apk add --no-cache libc6-compat

# Create app directory
WORKDIR /app

# where available (npm@5+)
COPY pnpm-lock.yaml .
COPY package.json .

RUN npm install -g pnpm@8.15.6

COPY . .

# RUN pnpm i
RUN pnpm -v
RUN pnpm i --frozen-lockfile

FROM node:18-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

# Building app
RUN pnpm run build
# HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
# EXPOSE 80

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD [ "pnpm", "run", "start" ]
