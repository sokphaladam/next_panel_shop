FROM node:18-alpine AS base

ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}

FROM base AS deps
RUN apk add --no-cache libc6-compat

# Create app directory
WORKDIR /usr/src/app

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

WORKDIR /usr/src/app

# Building app
RUN pnpm run build
# HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
# EXPOSE 80

CMD [ "pnpm", "run", "start" ]
