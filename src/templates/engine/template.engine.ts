import Handlebars from 'handlebars';
import pino from 'pino';

const logger = pino();

export class TemplateEngine {
  private templates: Map<string, Handlebars.TemplateDelegate> = new Map();

  constructor() {
    // Register custom helpers
    Handlebars.registerHelper('formatCurrency', (value: number) => {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    });

    // Initialize with default templates
    this.register('TXNX-001-v1', '{{stock_name}} BUY executed: {{qty}} shares @ {{formatCurrency price}}. Total: {{formatCurrency total}}. -WealthBridge');
    this.register('RISK-001-v1', 'MARGIN CALL: Shortfall of {{formatCurrency shortfall_amount}}. Deadline: {{deadline}}. Add funds to avoid liquidation. -WealthBridge');
  }

  register(id: string, content: string) {
    this.templates.set(id, Handlebars.compile(content));
  }

  render(templateId: string, data: any): string {
    const template = this.templates.get(templateId);
    if (!template) {
      logger.error({ templateId }, 'Template not found');
      throw new Error(`Template ${templateId} not found`);
    }
    return template(data);
  }
}
