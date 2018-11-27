import React, { Component } from 'react';
import GameIndex from './game/Index';
import './App.css';
import StartScreen from './StartScreen'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      gameStarted: false,
    }
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({
      gameStarted: true,
    })
  }

  componentDidMount() {
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13)
        this.setState({ gameStarted: true })
    });
  }

  render() {
    return (
      <div className="App">
        { this.state.gameStarted ?
          <GameIndex /> :
          <StartScreen 
            onClick={() => this.startGame()}
          />
        }
      </div>
    );
  }
}

export default App;
