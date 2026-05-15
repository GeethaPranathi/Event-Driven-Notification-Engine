# ADR 001: Technology Stack Selection

## Status
Accepted

## Context
We need to build a high-performance, fault-tolerant notification engine capable of processing millions of financial events daily. The system must support real-time delivery, regulatory compliance, and multi-channel routing.

## Decision
We have selected the following technology stack:
- **Runtime**: Node.js 20 LTS with TypeScript.
- **API Framework**: Fastify for its high performance and low overhead.
- **Event Streaming**: Apache Kafka for ingestion and persistent event logs.
- **Message Broker**: RabbitMQ for complex routing, priority queues, and delivery workers.
- **Cache/State**: Redis for rate limiting, frequency capping, and idempotency.
- **Database**: PostgreSQL for persistence, utilizing partitioning for notification history.

## Consequences
- **Pros**:
  - High scalability and throughput.
  - Robust delivery guarantees (at-least-once).
  - Clear separation between ingestion (streaming) and delivery (routing).
- **Cons**:
  - Operational complexity due to multiple infrastructure components.
  - Requires careful monitoring of consumer lags and queue depths.
