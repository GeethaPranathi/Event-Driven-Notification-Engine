# Event-Driven Notification Engine

## Overview
Enterprise-scale notification engine for financial services. Processes 25+ event types and delivers across 5+ channels (SMS, Email, Push, WhatsApp, In-App).

## Tech Stack
- **Node.js 20 LTS** & **TypeScript**
- **Fastify** (API Framework)
- **Kafka** (Ingestion/Streaming)
- **RabbitMQ** (Routing/Priority Queues)
- **PostgreSQL** (Persistence with Partitioning)
- **Redis** (Rate limiting, Caching, Frequency caps)
- **Docker** & **Docker Compose**

## Infrastructure
Run the following to start the infrastructure:
```bash
docker-compose up -d
```

## Getting Started
1. `npm install`
2. `cp .env.example .env`
3. `npm run dev`

## Documentation
- [Architecture Design](./docs/architecture.md)
- [Event Taxonomy](./docs/event-taxonomy.yaml)
- [API Specification](./docs/api-specification.yaml)

## Deployment

### Frontend (Dashboard)
The dashboard is optimized for **Vite** and can be deployed to **Vercel** or **Netlify**:
1. Connect this repository to Vercel.
2. Set the root directory to `dashboard`.
3. Use Build Command: `npm run build`.
4. Output Directory: `dist`.

### Backend (Engine)
The Node.js engine can be deployed to **Render** or **Railway**:
1. Connect this repository to Render.
2. Set Build Command: `npm install && npm run build`.
3. Start Command: `npm start`.
4. Add environment variables from `.env.example`.

