import pino from 'pino';

const logger = pino();

export interface DeliveryResult {
  success: boolean;
  externalId?: string;
  error?: string;
}

export abstract class DeliveryProvider {
  abstract send(to: string, content: string): Promise<DeliveryResult>;
}

export class MockSMSProvider extends DeliveryProvider {
  async send(to: string, content: string): Promise<DeliveryResult> {
    logger.info({ to, content }, 'Mock SMS sending...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
    
    // 95% success rate
    const success = Math.random() > 0.05;
    return {
      success,
      externalId: success ? `msg91_${Math.random().toString(36).slice(2)}` : undefined,
      error: success ? undefined : 'Provider Timeout',
    };
  }
}

export class MockEmailProvider extends DeliveryProvider {
  async send(to: string, content: string): Promise<DeliveryResult> {
    logger.info({ to }, 'Mock Email sending...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, externalId: `ethereal_${Date.now()}` };
  }
}

export class DeliveryService {
  private providers: Map<string, DeliveryProvider> = new Map();

  constructor() {
    this.providers.set('sms', new MockSMSProvider());
    this.providers.set('email', new MockEmailProvider());
    // Add others...
  }

  async deliver(channel: string, to: string, content: string): Promise<DeliveryResult> {
    const provider = this.providers.get(channel);
    if (!provider) {
      throw new Error(`No provider for channel: ${channel}`);
    }
    return provider.send(to, content);
  }
}
