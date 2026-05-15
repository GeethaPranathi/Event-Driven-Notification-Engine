import { z } from 'zod';

export const BaseEventSchema = z.object({
  event_type: z.string().regex(/^[A-Z]{4}-\d{3}$/),
  event_id: z.string(),
  source_system: z.string(),
  timestamp: z.string().datetime(),
  priority: z.number().int().min(1).max(5),
  user_id: z.string().uuid(),
  idempotency_key: z.string().optional(),
});

// Category: Transaction Events (TXNX)
export const TXNX_001_Schema = BaseEventSchema.extend({
  payload: z.object({
    stock_name: z.string(),
    qty: z.number().positive(),
    price: z.number().positive(),
    total: z.number().positive(),
    portfolio_value: z.number().optional(),
    order_id: z.string(),
  }),
});

// Category: Risk & Margin Events (RISK)
export const RISK_001_Schema = BaseEventSchema.extend({
  payload: z.object({
    shortfall_amount: z.number().positive(),
    current_margin: z.number().nonnegative(),
    required_margin: z.number().positive(),
    deadline: z.string().datetime(),
    auto_square_off_time: z.string().datetime(),
    affected_positions: z.array(z.object({
      symbol: z.string(),
      qty: z.number(),
      current_value: z.number(),
    })).optional(),
  }),
});

// Map of all validators
export const EventValidators: Record<string, z.ZodSchema> = {
  'TXNX-001': TXNX_001_Schema,
  'RISK-001': RISK_001_Schema,
  // Add others here...
};

export type BaseEvent = z.infer<typeof BaseEventSchema>;
