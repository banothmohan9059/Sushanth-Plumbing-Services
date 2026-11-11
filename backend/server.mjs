import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import enquiriesHandler from './api/enquiries.js';
import healthHandler from './api/health.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.length === 0 ||
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/sushanth-plumbing-services(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, false);
  },
}));

// Map Vercel Serverless Functions to Express routes
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    service: 'Sushanth Plumbing Services API',
    endpoints: ['/api/health', '/api/enquiries'],
  });
});

app.all('/api/enquiries', async (req, res) => {
  return enquiriesHandler(req, res);
});

app.all('/api/health', async (req, res) => {
  return healthHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`✅ Local Backend API Server running on http://localhost:${PORT}`);
  console.log(`Test Health: http://localhost:${PORT}/api/health`);
});
