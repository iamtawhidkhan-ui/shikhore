# Step 8: Usha (Gemini, server-side)

Extract INTO your shikhore folder and replace when asked
(vite.config.ts, .env.example, AssistantPage and types/assistant.ts are replaced on purpose).
Your real .env is NOT in this zip and is never touched.

Then:
  npx tsc -b
  npx tsc -p tsconfig.api.json
  npm run dev
