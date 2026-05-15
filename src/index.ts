import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

server.get('/health', async (request, reply) => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Notification Engine started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
