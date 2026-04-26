FROM node:18-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --filter web

COPY apps/web ./apps/web
WORKDIR /app/apps/web

ENV VITE_API_URL=http://localhost:4000
ENV VITE_WS_URL=ws://localhost:4000

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "3000"]
