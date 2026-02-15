import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.use(json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', apiRouter);

  app.use(errorHandler);

  return app;
};

