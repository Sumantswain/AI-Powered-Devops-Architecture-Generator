import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: getEnv('JWT_SECRET', 'dev-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  db: {
    host: getEnv('POSTGRES_HOST', 'postgres'),
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: getEnv('POSTGRES_USER', 'devops_user'),
    password: getEnv('POSTGRES_PASSWORD', 'devops_pass'),
    database: getEnv('POSTGRES_DB', 'devops_architect'),
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'redis',
    port: Number(process.env.REDIS_PORT ?? 6379),
  },
  ai: {
    provider: process.env.AI_PROVIDER ?? 'openai',
    apiKey: process.env.AI_API_KEY ?? '',
    model: process.env.AI_MODEL ?? 'gpt-4.1-mini',
  },
};

