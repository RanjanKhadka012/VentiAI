# Railway Deployment Guide

This backend has been optimized for deployment on Railway.

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected to Railway

## Deployment Steps

1. **Connect to Railway**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository

2. **Configure Environment Variables**
   - Go to your Railway project settings
   - Add the following variables:
     - `NODE_ENV`: `production`
     - `PORT`: `8000` (or any preferred port)

3. **Build & Deploy**
   - Railway will automatically detect the Node.js project
   - It will run `npm install` and `npm start`
   - Your app will be deployed automatically on push

## Configuration Files

- **railway.json**: Main Railway configuration with health check
- **.railwayignore**: Files to exclude from deployment
- **Procfile**: Alternative process file (optional)
- **.env.example**: Environment variables template

## Key Optimizations Made

✓ Updated package.json with correct entry point (`backend/server.js`)
✓ Added Node.js engine specification (v18+)
✓ Server configured to listen on `0.0.0.0` for production
✓ Port configuration via `process.env.PORT`
✓ Health check endpoint configured at `/api/stats`
✓ Frontend static files properly served from `frontend/public`

## Testing Locally

Before deploying, test locally:
```bash
NODE_ENV=production PORT=3000 npm start
```

## Support

For Railway-specific issues, visit: https://docs.railway.app
