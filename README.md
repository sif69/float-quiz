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

## live link: https://float-quiz.onrender.com/

## Notes

- Voice recognition requires **HTTPS** (works automatically on Vercel/Render)
- Best in **Chrome** or **Edge** for voice support
- Falls back to tap-only on Firefox / Safari
