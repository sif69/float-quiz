const MODE_LABELS = {
  celebrity: '🌟 Celebrity Quiz',
  flags:     '🌍 Flags & Fruits',
  words:     '📚 Word Master',
}

export default function GameOver({ score, highScore, mode, onReplay, onMenu }) {
  const isNewHigh = score > 0 && score >= highScore

  const grade = score >= 400 ? { label: 'LEGENDARY', emoji: '👑' }
    : score >= 250 ? { label: 'EXPERT',    emoji: '🏆' }
    : score >= 150 ? { label: 'SKILLED',   emoji: '⭐' }
    : score >= 80  ? { label: 'LEARNING',  emoji: '📈' }
    : { label: 'KEEP TRYING', emoji: '💪' }

  return (
    <div className="gameover">
      <div className="gameover-card">
        <div className="gameover-emoji">{isNewHigh ? '🏆' : grade.emoji}</div>

        <h1>{isNewHigh ? 'New High Score!' : 'Game Over!'}</h1>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {MODE_LABELS[mode]}
        </p>

        <div className="final-score-wrap">
          <div className="final-score">{score.toLocaleString()}</div>
          <div className="final-score-label">points · {grade.label}</div>
        </div>

        {isNewHigh && (
          <div className="new-record">🎉 Personal Best!</div>
        )}

        <p className="best-score">
          Best: {highScore.toLocaleString()} pts
        </p>

        <div className="gameover-actions">
          <button className="btn-primary" onClick={onReplay}>▶ Play Again</button>
          <button className="btn-secondary" onClick={onMenu}>← Back to Menu</button>
        </div>
      </div>
    </div>
  )
}
