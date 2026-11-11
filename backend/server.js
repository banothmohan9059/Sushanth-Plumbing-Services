require('dotenv').config();
const express = require('express');
const cors = require('cors');
const enquiriesHandler = require('./api/enquiries');
const healthHandler = require('./api/health');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*'
}));

// Map Vercel Serverless Functions to Express routes
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    service: 'Sushanth Plumbing Services API',
    endpoints: ['/api/health', '/api/enquiries'],
  });
});

app.all('/api/enquiries', (req, res) => {
  return enquiriesHandler(req, res);
});

app.all('/api/health', (req, res) => {
  return healthHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`✅ Local Backend API Server running on http://localhost:${PORT}`);
  console.log(`Test Health: http://localhost:${PORT}/api/health`);
});
