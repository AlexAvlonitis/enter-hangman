import React from 'react'

export default ({onClick}) =>
      <div className="App-text-center">
        <h1> Enter HangMan </h1>
        <button
          className="App-start-game-btn"
          onClick={onClick}
        >
          Start Game
        </button>
        <p>
          <small>Or press Enter</small>
        </p>
      </div>