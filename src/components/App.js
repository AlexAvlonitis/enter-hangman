import React, { Component } from 'react';
import GameIndex from './game/Index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { gameStarted: false }
  }

  renderStartScreen = () => {
    return (
      <div className="App-text-center">
        <h1> Enter HangMan </h1>
        <button
          className="App-start-game-btn"
          onClick={() => this.setState({gameStarted: true})}
        >
          Start Game
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.state.gameStarted ?
          <GameIndex /> :
          this.renderStartScreen()
        }
      </div>
    );
  }
}

export default App;
