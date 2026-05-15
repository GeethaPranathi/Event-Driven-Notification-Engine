import { NotificationEngine } from './notifications/engine/notification.engine.js';
import { EventFactory } from './events/event.factory.js';
import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino();
const prisma = new PrismaClient();
const engine = new NotificationEngine();

async function runSimulation() {
  logger.info('Starting full system simulation...');

  // 1. Get a test user
  const user = await prisma.user.findFirst();
  if (!user) {
    logger.error('No users found in database. Please run seed script first.');
    return;
  }

  // 2. Trigger various events
  const events = [
    EventFactory.createTransactionEvent(user.id),
    EventFactory.createRiskEvent(user.id),
    EventFactory.createTransactionEvent(user.id),
  ];

  for (const event of events) {
    await engine.processEvent(event);
  }

  logger.info('Simulation events ingested. Delivery processing active in background.');
}

runSimulation().catch(console.error);
