FROM node:18-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/server/package.json ./apps/server/

RUN pnpm install --filter server

COPY packages/shared ./packages/shared
COPY apps/server ./apps/server

WORKDIR /app/apps/server
RUN pnpm build

EXPOSE 4000
CMD ["pnpm", "start"]
