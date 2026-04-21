import { useState } from 'react'
import Menu from './components/Menu'
import Game from './components/Game'
import GameOver from './components/GameOver'
import { addScore, getHighScores, getRecentScores, loadDb } from './db'

export default function App() {
  const [screen, setScreen] = useState('menu')
  const [mode, setMode] = useState(null)
  const [finalScore, setFinalScore] = useState(0)
  const [db, setDb] = useState(() => loadDb())

  const highScores = getHighScores(db)
  const recentScores = getRecentScores(db, 5)

  function startGame(m) {
    setMode(m)
    setScreen('game')
  }

  function endGame(score) {
    setFinalScore(score)
    setDb(prev => addScore(prev, { mode, score }))
    setScreen('gameover')
  }

  return (
    <div className="app">
      {screen === 'menu' && (
        <Menu onStart={startGame} highScores={highScores} recentScores={recentScores} />
      )}
      {screen === 'game' && (
        <Game
          key={`${mode}-${Date.now()}`}
          mode={mode}
          onGameOver={endGame}
          onMenu={() => setScreen('menu')}
        />
      )}
      {screen === 'gameover' && (
        <GameOver
          score={finalScore}
          highScore={highScores[mode] || 0}
          mode={mode}
          onReplay={() => startGame(mode)}
          onMenu={() => setScreen('menu')}
        />
      )}
    </div>
  )
}
