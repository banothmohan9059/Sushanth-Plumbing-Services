# Sushanth Plumbing Services Website - Setup Guide

## 1. Prerequisites
- Node.js (v18 or higher)
- Git
- Supabase account
- Vercel account

## 2. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the SQL Editor.
3. Copy the contents of `supabase/migrations/00001_initial_schema.sql` and run it.
4. Go to Project Settings -> API.
5. Note down the **Project URL** and **service_role secret**.

## 3. Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY` (use service_role key)
   - `ALLOWED_ORIGINS` (e.g., `http://localhost:5173,https://sushanthplumbingservices.in`)
4. To test locally with Vercel CLI, run `vercel dev`.

## 4. Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add:
   - `VITE_API_BASE_URL=http://localhost:3000/api` (or your local backend URL)
4. Run `npm run dev` to start the development server.

## 5. Next Steps
- Validate Service Areas with the owner.
- Set up domain and deploy. (See DEPLOYMENT.md)
