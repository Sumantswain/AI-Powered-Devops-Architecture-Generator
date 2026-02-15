import { dbPool } from '../config/db';
import bcrypt from 'bcrypt';

export type UserRole = 'admin' | 'user';
export type UserPlan = 'free' | 'pro';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  plan: UserPlan;
  created_at: Date;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await dbPool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email],
  );
  return result.rows[0] ?? null;
}

export async function createUser(
  email: string,
  password: string,
  role: UserRole = 'user',
  plan: UserPlan = 'free',
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await dbPool.query<User>(
    'INSERT INTO users (email, password_hash, role, plan) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, passwordHash, role, plan],
  );
  return result.rows[0];
}

export async function validateUser(
  email: string,
  password: string,
): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  return isValid ? user : null;
}

