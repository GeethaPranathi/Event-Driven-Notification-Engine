import pino from 'pino';

const logger = pino();

export class RetryManager {
  calculateNextRetry(attempt: number, priority: number): number {
    const baseDelay = priority === 1 ? 500 : 1000; // CRITICAL gets faster retries
    const maxDelay = priority === 1 ? 60000 : 300000; // 1m vs 5m
    
    const exponentialBackoff = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 1000;
    
    return Math.min(exponentialBackoff + jitter, maxDelay);
  }

  shouldRetry(attempt: number, priority: number): boolean {
    const maxRetries = priority === 1 ? 10 : 3;
    return attempt < maxRetries;
  }
}
