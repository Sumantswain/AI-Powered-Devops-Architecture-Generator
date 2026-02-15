import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const port = Number(process.env.PORT) || 4000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api' });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
