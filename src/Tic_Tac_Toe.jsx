import React from "react"
import Executor, { useExecutor } from "executor-fn"

const initialBoard = Array(9).fill(null)

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ]
  for (let [a, b, c] of lines) {
    if ((board[a] && board[a] === board[b]) && (board[a] === board[c])) {
      return board[a]
    }
  }
  return null
}

const gameState = Executor((board, move) => {
  if (board[move.index] || move.winner) return board // ignore if occupied or game ended
  const newBoard = [...board]
  newBoard[move.index] = move.player
  return newBoard
}, {
  storeHistory: true,
  initialArgs: [initialBoard],
  callNow: true
})

function TicTacToe() {
  const game = useExecutor(gameState)

  const winner = calculateWinner(game.value)
  const isDraw = !winner && game.value.every(cell => cell !== null)

  const currentPlayer = game.history.length % 2 === 1 ? "X" : "O"

  const handleMove = (index) => {
    if (winner || isDraw) return // prevent moves if game over
    game(game.value, { index, player: currentPlayer, winner })
  }

  const jumpTo = (step) => {
    if (step < 0 || step >= game.history.length) return
    game.jump(step)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Tic-Tac-Toe 🎮</h1>

      {/* Status */}
      {winner ? (
        <h2>🏆 Winner: {winner}</h2>
      ) : isDraw ? (
        <h2>🤝 Draw!</h2>
      ) : (
        <h3>Current Player: {currentPlayer}</h3>
      )}

      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gridGap: "5px",
          justifyContent: "center",
          margin: "1rem auto"
        }}
      >
        {game.value.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleMove(i)}
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              backgroundColor: "#f0f0f0",
              border: "2px solid #333",
              cursor: winner || isDraw ? "not-allowed" : "pointer"
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={game.undo} disabled={game.history.length <= 1}>
          ⏪ Undo
        </button>
        <button onClick={game.redo} disabled={game.redoStack.length === 0}>
          ⏩ Redo
        </button>
      </div>

      {/* Time Travel */}
      <div style={{ marginTop: "2rem" }}>
        <h3>History</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {game.history.map((h, idx) => (
            <li key={idx}>
              <button
                onClick={() => jumpTo(idx)}
                style={{
                  margin: "3px",
                  padding: "5px 10px",
                  backgroundColor: idx === game.pointer ? "lightblue" : "white",
                  border: "1px solid #333",
                  cursor: "pointer"
                }}
              >
                {idx === 0 ? "Start" : `Move #${idx}`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p>Moves so far: {game.history.length - 1}</p>
    </div>
  )
}

export default TicTacToe
