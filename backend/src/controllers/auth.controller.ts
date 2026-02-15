import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { createUser, findUserByEmail, validateUser } from '../models/user.model';
import { env } from '../config/env';

const router = Router();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function signToken(payload: {
  id: string;
  email: string;
  role: string;
  plan: string;
}) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

router.post('/register', async (req: Request, res: Response) => {
  try {
    const body = RegisterSchema.parse(req.body);
    const existing = await findUserByEmail(body.email);
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = await createUser(body.email, body.password);
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan,
    });
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    }
    return res.status(500).json({ message: 'Failed to register user' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = LoginSchema.parse(req.body);
    const user = await validateUser(body.email, body.password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan,
    });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input', issues: err.issues });
    }
    return res.status(500).json({ message: 'Failed to login' });
  }
});

export const authController = router;

