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
