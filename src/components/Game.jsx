import { useState, useEffect, useRef, useCallback } from 'react'
import { generateQuestions, voiceMatch } from '../data'

const BASE_SPEED = 9   // seconds to cross screen
const MIN_SPEED  = 4   // fastest
const SPEED_STEP = 0.5 // decrease every 5 questions

function calcSpeed(qIdx) {
  return Math.max(MIN_SPEED, BASE_SPEED - Math.floor(qIdx / 5) * SPEED_STEP)
}

export default function Game({ mode, onGameOver, onMenu }) {
  // ── State ──────────────────────────────────────────────
  const [questions, setQuestions] = useState([])
  const [qIdx,  setQIdx]       = useState(0)
  const [score, setScore]      = useState(0)
  const [lives, setLives]      = useState(3)
  const [streak,setStreak]     = useState(0)
  const [answered, setAnswered]= useState(false)
  const [chosen,   setChosen]  = useState(null)     // which button the user picked
  const [feedback, setFeedback]= useState(null)     // 'correct' | 'wrong' | 'missed'
  const [loadError, setLoadError] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [voiceText, setVoiceText]     = useState('')

  // ── Refs ───────────────────────────────────────────────
  const recogRef    = useRef(null)
  const answeredRef = useRef(false)   // mirror answered for use inside callbacks
  const scoreRef    = useRef(0)       // mirror score for game-over callbacks
  const livesRef    = useRef(3)
  const nextTimer   = useRef(null)

  const q = questions[qIdx]

  // ── Load dynamic questions ─────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoadError('')
      setQuestions([])
      setQIdx(0)

      try {
        const nextQs = await generateQuestions(mode)
        if (cancelled) return
        setQuestions(Array.isArray(nextQs) ? nextQs : [])
      } catch (_) {
        if (cancelled) return
        setLoadError('Could not load questions. Please try again.')
      }
    }

    load()
    return () => { cancelled = true }
  }, [mode])

  // ── Speech recognition setup (once) ───────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    const r = new SR()
    r.continuous    = true
    r.interimResults= true
    r.lang          = 'en-US'

    r.onresult = e => {
      const text = Array.from(e.results)
        .map(res => res[0].transcript)
        .join(' ')
        .toLowerCase()
        .trim()
      setVoiceText(text)
    }
    r.onend   = () => setIsListening(false)
    r.onerror = () => setIsListening(false)

    recogRef.current = r
    return () => { try { r.abort() } catch (_) {} }
  }, [])

  // ── Start listening when a new question appears ────────
  useEffect(() => {
    if (!q) return
    answeredRef.current = false
    setAnswered(false)
    setChosen(null)
    setFeedback(null)
    setVoiceText('')

    const r = recogRef.current
    if (r) {
      try { r.abort() } catch (_) {}
      setTimeout(() => {
        try { r.start(); setIsListening(true) } catch (_) {}
      }, 80)
    }

    return () => {
      try { recogRef.current?.abort() } catch (_) {}
      clearTimeout(nextTimer.current)
    }
  }, [qIdx, q])

  // ── Handle voice transcript ────────────────────────────
  useEffect(() => {
    if (!voiceText || answeredRef.current || !q) return
    const matched = voiceMatch(voiceText, q)
    if (matched) pick(matched)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceText])

  // ── Core answer handler ────────────────────────────────
  const pick = useCallback((choice) => {
    if (answeredRef.current) return
    answeredRef.current = true
    setAnswered(true)
    setChosen(choice)

    try { recogRef.current?.abort() } catch (_) {}
    setIsListening(false)

    const isCorrect = choice === q.correct

    if (isCorrect) {
      const newStreak = streak + 1
      const pts = 10 * Math.min(newStreak, 5)
      const newScore = scoreRef.current + pts
      scoreRef.current = newScore
      setScore(newScore)
      setStreak(newStreak)
      setFeedback('correct')
    } else {
      const newLives = livesRef.current - 1
      livesRef.current = newLives
      setLives(newLives)
      setStreak(0)
      setFeedback('wrong')

      if (newLives <= 0) {
        nextTimer.current = setTimeout(() => onGameOver(scoreRef.current), 1600)
        return
      }
    }

    scheduleNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, streak])

  // ── Called when item drifts off screen (no answer) ────
  const handleMissed = useCallback(() => {
    if (answeredRef.current) return
    answeredRef.current = true
    setAnswered(true)

    try { recogRef.current?.abort() } catch (_) {}
    setIsListening(false)

    const newLives = livesRef.current - 1
    livesRef.current = newLives
    setLives(newLives)
    setStreak(0)
    setFeedback('missed')

    if (newLives <= 0) {
      nextTimer.current = setTimeout(() => onGameOver(scoreRef.current), 1600)
      return
    }

    scheduleNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function scheduleNext() {
    nextTimer.current = setTimeout(() => {
      const next = qIdx + 1
      if (next >= questions.length) {
        onGameOver(scoreRef.current)
      } else {
        setQIdx(next)
      }
    }, 1500)
  }

  // ── Render ─────────────────────────────────────────────
  if (loadError) {
    return (
      <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>{loadError}</div>
        <button className="hud-menu-btn" onClick={onMenu}>Back to Menu</button>
      </div>
    )
  }

  if (!q) return <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>Loading…</div>

  const speed    = calcSpeed(qIdx)
  const mult     = Math.min(streak + 1, 5)
  const pts      = 10 * mult
  const floaterState = feedback ? `state-${feedback}` : ''

  return (
    <div className="game-screen">

      {/* ── HUD ── */}
      <div className="hud">
        <div className="hud-lives">
          {[0,1,2].map(i => (
            <span key={i} className={i < lives ? 'life-active' : 'life-gone'}>❤️</span>
          ))}
        </div>
        <div>
          {streak >= 2 && <div className="streak-badge">🔥 ×{streak}</div>}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div className="hud-score">{score.toLocaleString()}</div>
          <button className="hud-menu-btn" onClick={onMenu}>✕ Menu</button>
        </div>
      </div>

      {/* ── Game arena ── */}
      <div className="game-area">

        {/* Floating item */}
        <div
          key={qIdx}
          className={`floater ${answered ? 'paused' : ''} ${floaterState}`}
          style={{ '--top': `${q.vertPos}%`, '--speed': `${speed}s`, top: `${q.vertPos}%` }}
          onAnimationEnd={handleMissed}
        >
          <div className="floater-bubble">
            <span className="floater-emoji">{q.emoji}</span>
            {q.subtext && <span className="floater-subtext">{q.subtext}</span>}
          </div>
        </div>

        {/* Feedback banner */}
        {feedback && (
          <div className={`feedback-banner ${feedback}`}>
            {feedback === 'correct' && `✅ +${pts} pts${streak >= 2 ? ` (×${mult})` : ''}`}
            {feedback === 'wrong'   && `❌ ${q.correct}`}
            {feedback === 'missed'  && `⏰ ${q.correct}`}
          </div>
        )}

      </div>

      {/* ── Choices ── */}
      <div className="choices-section">
        <div className="choices-label">
          {mode === 'words' ? 'Pick the correct definition' : 'Who / what is this?'}
        </div>
        <div className="choices-grid">
          {q.choices.map((c, i) => {
            let cls = 'choice-btn'
            if (feedback) {
              if (c === q.correct)  cls += ' correct'
              else if (c === chosen) cls += ' wrong'
            }
            return (
              <button key={i} className={cls} onClick={() => pick(c)} disabled={answered}>
                {c}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Voice bar ── */}
      <div className="voice-bar">
        <span className={`mic-dot ${isListening ? 'active' : ''}`} />
        <span>{isListening ? 'Listening…' : recogRef.current ? 'Tap mic to speak' : 'Tap buttons to answer'}</span>
        {voiceText && <span className="voice-preview">"{voiceText}"</span>}
        {!recogRef.current && (
          <span className="voice-unavailable">🎤 Voice not available in this browser</span>
        )}
      </div>

    </div>
  )
}
