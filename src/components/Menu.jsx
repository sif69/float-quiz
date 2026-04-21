const MODES = [
  {
    id: 'celebrity',
    icon: '🌟',
    title: 'Celebrity Quiz',
    desc: 'Name the famous person!',
    color: '#e94560',
  },
  {
    id: 'flags',
    icon: '🌍',
    title: 'Flags & Fruits',
    desc: 'Name the flag or fruit!',
    color: '#4ade80',
  },
  {
    id: 'words',
    icon: '📚',
    title: 'Word Master',
    desc: 'Match the definition!',
    color: '#38bdf8',
  },
]

const MODE_NAMES = {
  celebrity: 'Celebrity',
  flags: 'Flags & Foods',
  words: 'Word Master',
}

export default function Menu({ onStart, highScores, recentScores = [] }) {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1>🎮 FloatQuiz</h1>
        <p>Catch floating items — tap or speak to answer!</p>
      </div>

      <div className="mode-cards">
        {MODES.map(m => (
          <button
            key={m.id}
            className="mode-card"
            style={{ '--card-color': m.color }}
            onClick={() => onStart(m.id)}
          >
            <span className="mode-icon">{m.icon}</span>
            <div>
              <h2>{m.title}</h2>
              <p>{m.desc}</p>
            </div>
            {highScores[m.id] > 0 && (
              <div className="mode-score">🏆 {highScores[m.id]}</div>
            )}
          </button>
        ))}
      </div>

      <div className="recent-scores">
        <h3>Recent Scores</h3>
        {recentScores.length === 0 ? (
          <p className="recent-empty">No games yet. Start one!</p>
        ) : (
          <ul>
            {recentScores.map(row => (
              <li key={row.id}>
                <span>{MODE_NAMES[row.mode] || row.mode}</span>
                <strong>{row.score}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="menu-tip">🎤 Voice recognition · 👆 Tap to play · 🔥 Build streaks</p>
    </div>
  )
}
