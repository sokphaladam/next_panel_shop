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


# RUN pnpm i
RUN pnpm -v
RUN pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm@8.15.6
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Building app
RUN pnpm run build
# HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
# EXPOSE 80

FROM base as runner
WORKDIR /app
RUN npm install -g pnpm@8.15.6
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD [ "pnpm", "run", "start" ]
