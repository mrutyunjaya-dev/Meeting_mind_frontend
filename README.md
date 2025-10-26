# MeetingMind Frontend (React + Vite + Tailwind)

A clean, production-ready frontend to pair with your MeetingMind backend.

## Features
- Auth flow (login, persist token, logout)
- Dashboard with insights + recent meetings
- Upload page with drag & drop
- Meeting detail page (summary, transcript, action items, sentiment)
- Settings page (profile + integrations placeholder)
- Axios instance with env-configurable API base
- TypeScript, React Router, Zustand state
- TailwindCSS styling

## Prereqs
- Node.js 18+ and npm 9+

## Quick Start
```bash
# 1) Unzip and enter the folder
unzip meetingmind-frontend.zip
cd meetingmind-frontend

# 2) Copy env and point to your backend
cp .env.example .env
# Edit .env and set VITE_API_BASE to your backend, e.g.
# VITE_API_BASE=http://localhost:4000

# 3) Install deps and run
npm install
npm run dev

# 4) Build for prod
npm run build
npm run preview
```

## Expected Backend Endpoints
Adjust if your backend differs.
- `POST /api/auth/login` -> `{ token, user }`
- `GET  /api/auth/me`    -> `{ user }`
- `POST /api/auth/logout`
- `GET  /api/meetings`   -> `{ meetings: [...] }`
- `GET  /api/meetings/:id` -> `{ meeting: {...} }`
- `POST /api/upload` (multipart: file) -> `{ meeting: { _id } }`
- `GET  /api/insights` -> `{ insights: { totalMeetings, totalActionItems, avgSentiment } }`

## Customization
- Update colors in `tailwind.config.js`.
- Add components/pages in `src/`.
- Swap auth logic in `src/store/auth.ts` if your backend behaves differently.

## Notes
- The Login page also links to `VITE_LOGIN_URL` (your backend login) as a fallback.
- CORS should be configured on the backend to allow `http://localhost:5173` in dev.
