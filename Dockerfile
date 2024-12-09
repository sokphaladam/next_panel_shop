FROM node:18-alpine

ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}

# Create app directory
WORKDIR /usr/src/app

# where available (npm@5+)
COPY pnpm-lock.yaml .
COPY package.json .

RUN npm install -g pnpm@8.15.6

COPY . .

RUN pnpm i
RUN pnpm -v

ENV NEXT_TELEMETRY_DISABLED=1

# Building app
RUN pnpm run build
# HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
# EXPOSE 80

CMD [ "pnpm", "run", "start" ]
