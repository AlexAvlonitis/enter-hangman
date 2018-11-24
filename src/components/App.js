import React, { Component } from 'react';
import WordInput from './word/WordInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { gameStarted: false }
  }

  renderStartGameButton = () => {
    return (
      <button
        className="App-start-game-btn"
        onClick={() => this.setState({gameStarted: true})}
      >
        Start Game
      </button>
    )
  }

  render() {
    return (
      <div className="App">
        <h1> Enter HangMan </h1>
        { this.state.gameStarted ?
          <WordInput /> :
          this.renderStartGameButton()
        }
      </div>
    );
  }
}

export default App;
