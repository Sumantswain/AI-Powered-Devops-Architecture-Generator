import { Router, Response } from 'express';
import { z } from 'zod';
import { AiEngine, ArchitectureInputSchema } from '../ai/engine';
import { AuthRequest, authenticate } from '../middleware/auth';
import { redisClient } from '../config/redis';
import {
  saveArchitecture,
  listUserArchitectures,
} from '../models/architecture.model';

const router = Router();
const aiEngine = new AiEngine();

const GenerateSchema = ArchitectureInputSchema.extend({
  name: z.string().min(3),
});

router.post(
  '/generate-architecture',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = GenerateSchema.parse(req.body);

      // Simple SaaS gating: Free plan users cannot request HA architectures
      // with high traffic. This is where you would integrate with Stripe
      // or any billing provider and enforce plan limits.
      if (
        req.user?.plan === 'free' &&
        (body.highAvailability || body.trafficScale === 'high')
      ) {
        return res.status(402).json({
          message:
            'High-availability and high-traffic architectures are available on the Pro plan. Please upgrade your subscription.',
        });
      }

      const ai = aiEngine.generateArchitecture({
        appType: body.appType,
        trafficScale: body.trafficScale,
        highAvailability: body.highAvailability,
        region: body.region,
      });

      const saved = await saveArchitecture({
        user_id: req.user!.id,
        name: body.name,
        app_type: body.appType,
        traffic_scale: body.trafficScale,
        ha_required: body.highAvailability,
        region: body.region,
        architecture: ai.architectureJson,
        terraform: ai.terraform,
        cicd_yaml: ai.cicdYaml,
        cost_breakdown: ai.costBreakdown,
        scalability_score: ai.scalabilityScore,
      });

      res.status(201).json({
        architecture: ai.architectureJson,
        terraform: ai.terraform,
        cicdYaml: ai.cicdYaml,
        cost: ai.costBreakdown,
        scalabilityScore: ai.scalabilityScore,
        record: saved,
      });
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res
          .status(400)
          .json({ message: 'Invalid input', issues: err.issues });
      }
      return res
        .status(500)
        .json({ message: 'Failed to generate architecture' });
    }
  },
);

router.post(
  '/generate-terraform',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = ArchitectureInputSchema.parse(req.body);
      const ai = aiEngine.generateArchitecture(body);
      res.json({ terraform: ai.terraform });
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res
          .status(400)
          .json({ message: 'Invalid input', issues: err.issues });
      }
      return res.status(500).json({ message: 'Failed to generate terraform' });
    }
  },
);

router.post(
  '/generate-cicd',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = ArchitectureInputSchema.parse(req.body);
      const ai = aiEngine.generateArchitecture(body);
      res.json({ cicdYaml: ai.cicdYaml });
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res
          .status(400)
          .json({ message: 'Invalid input', issues: err.issues });
      }
      return res.status(500).json({ message: 'Failed to generate CI/CD yaml' });
    }
  },
);

router.post(
  '/estimate-cost',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = ArchitectureInputSchema.parse(req.body);
      const cacheKey = `cost:${body.appType}:${body.trafficScale}:${body.highAvailability}:${body.region}`;

      const cached = (await redisClient.get(cacheKey)) as string | null;
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const ai = aiEngine.generateArchitecture(body);
      const response = {
        cost: ai.costBreakdown,
        scalabilityScore: ai.scalabilityScore,
      };

      await redisClient.set(cacheKey, JSON.stringify(response), {
        EX: 60 * 60,
      });

      res.json(response);
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res
          .status(400)
          .json({ message: 'Invalid input', issues: err.issues });
      }
      return res.status(500).json({ message: 'Failed to estimate cost' });
    }
  },
);

router.get('/user/history', authenticate, async (req: AuthRequest, res) => {
  try {
    const records = await listUserArchitectures(req.user!.id);
    res.json({ items: records });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch architecture history' });
  }
});

export const architectureController = router;

