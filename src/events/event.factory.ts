import { v4 as uuidv4 } from 'uuid';
import { BaseEvent } from './validators/event.validator.js';

export class EventFactory {
  static createTransactionEvent(userId: string): any {
    const stockNames = ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'ICICIBANK'];
    const stock = stockNames[Math.floor(Math.random() * stockNames.length)];
    const qty = Math.floor(Math.random() * 100) + 1;
    const price = Math.floor(Math.random() * 3000) + 500;

    return {
      event_type: 'TXNX-001',
      event_id: `EVT-${Date.now()}-${uuidv4().slice(0, 8)}`,
      source_system: 'trading_engine',
      timestamp: new Date().toISOString(),
      priority: 2,
      user_id: userId,
      payload: {
        stock_name: stock,
        qty,
        price,
        total: qty * price,
        order_id: `ORD-${uuidv4().slice(0, 8)}`,
      },
    };
  }

  static createRiskEvent(userId: string): any {
    return {
      event_type: 'RISK-001',
      event_id: `EVT-${Date.now()}-${uuidv4().slice(0, 8)}`,
      source_system: 'margin_engine',
      timestamp: new Date().toISOString(),
      priority: 1,
      user_id: userId,
      payload: {
        shortfall_amount: 50000,
        current_margin: 150000,
        required_margin: 200000,
        deadline: new Date(Date.now() + 3600000).toISOString(),
        auto_square_off_time: new Date(Date.now() + 7200000).toISOString(),
      },
    };
  }
}
