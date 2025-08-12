# SentryPrime Frontend

Professional accessibility scanning tool frontend built with React and Vite.

## Features

- Real-time website accessibility scanning
- Lawsuit risk calculation with realistic settlement breakdowns
- Professional UI with progress tracking
- Mobile responsive design
- Integration with SentryPrime backend API

## Environment Variables

Create a `.env` file with:

```
REACT_APP_BACKEND_URL=https://web-production-51f3.up.railway.app
```

## Development

```bash
npm install
npm run dev
```

## Production Build 

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for deployment on Vercel with automatic GitHub integration.

## Backend Integration

This frontend connects to the SentryPrime backend API hosted on Railway for:
- Website scanning and violation detection
- Lawsuit risk calculation
- AI-powered remediation recommendations

