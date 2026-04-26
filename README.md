# StreamShare

StreamShare is a web-based collaborative presentation and media broadcast platform. It lets a presenter control slides, media, and overlays from any device, while audiences view the output on any number of screens in real time.

## Architecture & Tech Stack

- **Frontend**: React (Vite, TypeScript), Tailwind CSS, Apollo Client, React Router
- **Backend**: Node.js, Apollo Server (GraphQL), graphql-ws, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time Sync**: GraphQL Subscriptions over WebSockets
- **Monorepo**: pnpm workspaces + Turborepo

## Key Features

- **Collaborative Sessions**: Create presentation rooms with unique URLs.
- **Multiple Media Types**: Supports TEXT, IMAGE, VIDEO, and IFRAME slides.
- **Real-time Output**: Viewers' screens instantly update when the presenter navigates.
- **Audience Q&A**: Viewers can submit questions that appear live on the presenter's panel, sorted by upvotes.
- **Live Reactions**: Viewers can send emoji reactions that float up as animated overlays on the main display screen.

## Setup & Local Development

### 1. Prerequisites
- Docker & Docker Compose
- pnpm

### 2. Run with Docker Compose
```bash
docker-compose up --build
```
- Frontend will be available at: http://localhost:3000
- Backend / GraphQL Playground at: http://localhost:4000/graphql

### 3. Deployment
- **Database**: Supabase
- **Backend**: Render Web Service
- **Frontend**: Vercel
