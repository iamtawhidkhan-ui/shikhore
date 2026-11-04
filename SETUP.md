# Shikhore: Step 1 setup

This zip contains the Step 1 files and folder structure. It does NOT contain
package.json or node_modules, so create the Vite project first, then copy
these files over it.

## PowerShell

```powershell
npm create vite@latest shikhore -- --template react-ts
cd shikhore
npm install
npm install react-router-dom lucide-react framer-motion @fontsource-variable/inter
npm install tailwindcss @tailwindcss/vite
npm install @google/genai
npm install -D @types/node @vercel/node
```

Then extract this zip INTO the shikhore folder and choose "Replace" when asked.

```powershell
Remove-Item src\App.css, src\assets\react.svg, public\vite.svg -ErrorAction SilentlyContinue
```

Create a `.env` file in the project root (git-ignored):

```
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=
```

Save your logo as `public/images/logo.png`, then:

```powershell
npm run dev
git init
git add .
git commit -m "chore: initial project setup"
```

Run `git status` before publishing and confirm `.env` is not listed.
