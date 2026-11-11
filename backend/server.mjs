import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import enquiriesHandler from './api/enquiries.js';
import healthHandler from './api/health.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*'
}));

// Map Vercel Serverless Functions to Express routes
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
