import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { architectureController } from '../controllers/architecture.controller';
import { adminController } from '../controllers/admin.controller';

const router = Router();

// Auth routes are namespaced under /auth
router.use('/auth', authController);

// Core API endpoints like POST /generate-architecture, /estimate-cost, etc.
router.use('/', architectureController);

// Admin-only analytics and usage metrics
router.use('/', adminController);

export const apiRouter = router;

