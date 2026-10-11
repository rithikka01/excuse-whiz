# ExcuseGPT 🤡

A playful excuse generator for everyday situations. Pick a situation and a personality, and get a ridiculous excuse instantly.

## Features
- 5 situations: Late to work, Missed a deadline, Cancelled plans, Skipped the gym, Forgot to reply
- 4 personalities: Innocent, Corporate, Dramatic, Unhinged
- Generate, Regenerate (avoids repeating the last excuse), Random, and Copy
- Humorous rotating loading messages
- Session history with per-item copy and clear
- Responsive dark UI with purple gradients and neon yellow accents
- Works offline from a built-in sample collection — no API key needed

## Tech stack
React 19 · TypeScript · Tailwind CSS v4 · TanStack Start · Vite

## Project structure
- `src/routes/index.tsx` — the app UI
- `src/lib/excuses.ts` — situations, personalities, sample excuses, loading messages
- `src/lib/excuse-service.ts` — `generateExcuse()` provider (swap this for a real AI API)

## Setup
```bash
bun install
bun run dev
```

## Adding a real AI API later
Replace the body of `generateExcuse()` in `src/lib/excuse-service.ts` with a call to a server function that queries your AI provider. Keep API keys server-side. The UI needs no changes.
