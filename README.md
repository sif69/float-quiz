# 🎮 FloatQuiz

A voice-powered floating quiz game with three modes. Items float across the screen — answer by speaking or tapping!

## Modes

| Mode | How it works |
|------|-------------|
| 🌟 Celebrity Quiz | A celebrity emoji floats by — name them! |
| 🌍 Flags & Fruits | Country flags & fruits float by — name them! |
| 📚 Word Master | A word floats by — pick the correct definition! |

## Features
- 🎤 Voice recognition (Web Speech API)
- 👆 Tap / click fallback for all browsers
- 🔥 Streak multiplier (up to 5×)
- 🏆 High score saved locally
- ⚡ Speed increases every 5 questions
- ❤️ 3 lives

---

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/float-quiz.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** ✅

---

## Deploy to Render

1. Push to GitHub (same as above)
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy** ✅

---

## Notes

- Voice recognition requires **HTTPS** (works automatically on Vercel/Render)
- Best in **Chrome** or **Edge** for voice support
- Falls back to tap-only on Firefox / Safari
