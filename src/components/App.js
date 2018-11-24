import React, { Component } from 'react';
import WordInput from './word/WordInput';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Enter HangMan </h1>
        <WordInput />
      </div>
    );
  }
}

export default App;
