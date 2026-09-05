# AI Email Drafting Assistant - Complete Project

This project is based on the previous Email Drafting Assistant discussion.

## Features

- React + Vite frontend
- Node.js + Express backend
- OpenAI email generation
- Fallback demo response when API key is missing
- Dark modern UI
- Flip-style Sign In / Sign Up page
- Typing / streaming effect
- Skeleton loading effect
- Tone selection
- Email type selection
- Generated email preview
- Copy email popup message
- Email draft popup
- Profile section
- Save OpenAI hit count per profile using localStorage

## Safety

Do not push your `.env` file or API key to GitHub.

## Folder Structure

```txt
ai_email_drafting_assistant_complete/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── index.html
│   └── README.md
│
└── README.md
```

---

## Backend Run

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend URL:

```txt
http://localhost:5001
```

---

## Frontend Run

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Backend `.env`

```env
PORT=5001
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
CLIENT_URL=http://localhost:5173
```

## Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## Deployment

### Frontend: Vercel

Set this environment variable:

```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

### Backend: Render

Set these environment variables:

```env
PORT=5001
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
CLIENT_URL=https://your-vercel-project.vercel.app
```
