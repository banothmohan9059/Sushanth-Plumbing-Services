# Deployment Guide

This guide explains how to deploy the Sushanth Plumbing Services website using Vercel.

## 1. Backend Deployment (Vercel)
The backend functions act as Vercel Serverless Functions.

1. Install Vercel CLI: `npm i -g vercel` (or deploy via GitHub integration).
2. Go to the `backend` directory.
3. Run `vercel`.
4. Link it to a new project (e.g., `sushanth-plumbing-backend`).
5. Set the Environment Variables in the Vercel Dashboard for this project:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
   - `ALLOWED_ORIGINS` (set this to the planned frontend URL: `https://sushanthplumbingservices.in`)
6. Deploy to production: `vercel --prod`.
7. Note the production URL (e.g., `https://sushanth-plumbing-backend.vercel.app`).

## 2. Frontend Deployment (Vercel)
The frontend is a React application built with Vite.

1. Go to the `frontend` directory.
2. Run `vercel`.
3. Link it to a new project (e.g., `sushanth-plumbing-frontend`).
4. Set the Environment Variables in the Vercel Dashboard:
   - `VITE_API_BASE_URL` (set this to the backend production URL + `/api`)
5. Deploy to production: `vercel --prod`.

## 3. Domain Configuration
1. In the Vercel Dashboard for the **frontend** project, go to Settings -> Domains.
2. Add the custom domain `sushanthplumbingservices.in`.
3. Configure the DNS settings with the domain registrar as instructed by Vercel (add A record or CNAME).
4. Verify HTTPS is enabled.

## 4. Final Testing
- Test the contact form to ensure it sends data to the Supabase database.
- Check the console for any CORS errors and update `ALLOWED_ORIGINS` if needed.
- Test WhatsApp and click-to-call links on a mobile device.
