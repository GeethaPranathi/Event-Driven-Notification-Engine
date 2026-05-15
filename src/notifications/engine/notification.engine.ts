import { BaseEvent, EventValidators } from '../../events/validators/event.validator.js';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';
import { ComplianceService } from '../../compliance/compliance.service.js';
import { TemplateEngine } from '../../templates/engine/template.engine.js';
import { DeliveryService } from '../../delivery/delivery.service.js';
import { RetryManager } from '../../delivery/retry/retry.manager.js';

const logger = pino();
const prisma = new PrismaClient();

export class NotificationEngine {
  private compliance = new ComplianceService();
  private templateEngine = new TemplateEngine();
  private deliveryService = new DeliveryService();
  private retryManager = new RetryManager();

  async processEvent(event: any) {
    logger.info({ eventId: event.event_id, type: event.event_type }, 'Processing event');

    const validator = EventValidators[event.event_type];
    if (!validator) return;

    const validationResult = validator.safeParse(event);
    if (!validationResult.success) return;

    const validatedEvent = validationResult.data as BaseEvent;

    const user = await prisma.user.findUnique({
      where: { id: validatedEvent.user_id },
      include: { preferences: true },
    });

    if (!user) return;

    const channels = await this.route(validatedEvent, user);
    
    for (const channel of channels) {
      const notification = await prisma.notification.create({
        data: {
          id: uuidv4(),
          eventType: validatedEvent.event_type,
          eventId: validatedEvent.event_id,
          userId: user.id,
          channel,
          priority: validatedEvent.priority,
          status: 'CREATED',
          templateId: `${validatedEvent.event_type}-v1`,
          personalizationData: (validatedEvent as any).payload,
        },
      });

      // Start asynchronous delivery flow
      this.executeDelivery(notification.id);
    }
  }

  private async route(event: BaseEvent, user: any): Promise<string[]> {
    if (event.event_type === 'RISK-001') return ['sms', 'push'];
    
    const category = event.event_type.split('-')[0];
    const preferredChannels = user.preferences
      .filter((p: any) => p.eventCategory === category && p.enabled)
      .map((p: any) => p.channel);

    return preferredChannels.length > 0 ? preferredChannels : ['in_app'];
  }

  private async executeDelivery(notificationId: string, attempt = 0) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: true },
    });

    if (!notification) return;

    try {
      // 1. Compliance
      const isTransactional = notification.priority === 1;
      const dndOk = await this.compliance.checkDND(notification.userId, notification.channel, isTransactional);
      const capOk = await this.compliance.checkFrequencyCap(notification.userId, notification.eventType.split('-')[0]);

      if (!dndOk || !capOk) {
        await this.updateStatus(notificationId, dndOk ? 'CAPPED' : 'DND');
        return;
      }

      // 2. Render
      const content = this.templateEngine.render(notification.templateId, notification.personalizationData);
      
      // 3. Deliver
      await this.updateStatus(notificationId, 'SENT');
      const result = await this.deliveryService.deliver(
        notification.channel, 
        notification.channel === 'sms' ? notification.user.phone : notification.user.email,
        content
      );

      if (result.success) {
        await prisma.notification.update({
          where: { id: notificationId },
          data: { status: 'DELIVERED', externalId: result.externalId, deliveredAt: new Date() },
        });
        logger.info({ notificationId }, 'Notification delivered successfully');
      } else {
        throw new Error(result.error || 'Delivery failed');
      }

    } catch (error: any) {
      logger.error({ notificationId, error: error.message, attempt }, 'Delivery attempt failed');
      
      if (this.retryManager.shouldRetry(attempt, notification.priority)) {
        const delay = this.retryManager.calculateNextRetry(attempt, notification.priority);
        await this.updateStatus(notificationId, 'RETRYING');
        setTimeout(() => this.executeDelivery(notificationId, attempt + 1), delay);
      } else {
        await this.updateStatus(notificationId, 'FAILED', error.message);
        // Move to DLQ logic would go here
      }
    }
  }

  private async updateStatus(id: string, status: string, reason?: string) {
    await prisma.notification.update({
      where: { id },
      data: { status, failedReason: reason },
    });
    
    await prisma.notificationStateLog.create({
      data: {
        notificationId: id,
        toStatus: status,
        actor: 'notification_engine',
        metadata: reason ? { reason } : undefined,
      },
    });
  }
}
