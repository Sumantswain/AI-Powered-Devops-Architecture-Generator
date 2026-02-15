import { Router } from 'express';
import { requireRole, authenticate, AuthRequest } from '../middleware/auth';
import { dbPool } from '../config/db';

const router = Router();

router.get(
  '/admin/usage',
  authenticate,
  requireRole(['admin']),
  async (_req: AuthRequest, res) => {
    const [userCount, archCount] = await Promise.all([
      dbPool.query<{ count: string }>('SELECT COUNT(*)::text as count FROM users'),
      dbPool.query<{ count: string }>(
        'SELECT COUNT(*)::text as count FROM architectures',
      ),
    ]);

    res.json({
      users: Number(userCount.rows[0].count),
      architectures: Number(archCount.rows[0].count),
    });
  },
);

export const adminController = router;

