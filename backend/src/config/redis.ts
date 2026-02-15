import { createClient } from 'redis';
import { env } from './env';

export const redisClient = createClient({
  socket: {
    host: env.redis.host,
    port: env.redis.port,
  },
});

redisClient.on('error', (err) => {
  console.error('Redis client error', err);
});

export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

