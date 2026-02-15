import { Pool } from 'pg';
import { env } from './env';

export const dbPool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

export async function initDb() {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      plan TEXT NOT NULL DEFAULT 'free',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS architectures (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      app_type TEXT NOT NULL,
      traffic_scale TEXT NOT NULL,
      ha_required BOOLEAN NOT NULL,
      region TEXT NOT NULL,
      architecture JSONB NOT NULL,
      terraform TEXT NOT NULL,
      cicd_yaml TEXT NOT NULL,
      cost_breakdown JSONB NOT NULL,
      scalability_score INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

