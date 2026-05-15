import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import pino from 'pino';

const logger = pino();
const prisma = new PrismaClient();

export class ComplianceService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_HOST || 'localhost');
  }

  async checkDND(userId: string, channel: string, isTransactional: boolean): Promise<boolean> {
    if (isTransactional) return true; // Transactional bypasses DND

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.dndStatus === 'REGISTERED') {
      logger.warn({ userId, channel }, 'DND Blocked: Promotional message to registered user');
      return false;
    }
    return true;
  }

  async checkFrequencyCap(userId: string, category: string): Promise<boolean> {
    const key = `cap:${userId}:${category}:${new Date().toISOString().split('T')[0]}`;
    const count = await this.redis.incr(key);
    
    if (count === 1) {
      await this.redis.expire(key, 86400); // 24 hours
    }

    const limit = 10; // Global daily limit for category
    if (count > limit) {
      logger.warn({ userId, category, count }, 'Frequency Cap Hit: Notification suppressed');
      return false;
    }
    return true;
  }
}
