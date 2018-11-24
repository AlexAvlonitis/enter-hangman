import React, { Component } from 'react';
import wordsText from '../../words.txt';
import { readFile } from '../../services/readFile'
import './WordInput.css';

class WordInput extends Component {
  constructor(props) {
    super(props);

    this.state = { wordsArray: null }
  }

  componentDidMount = () => {
    const wordsArray = readFile(wordsText);
    this.setState({ wordsArray });
  }

  render() {
    return (
      <div className="WordInput">
        Welcome to hangman
      </div>
    );
  }
}

export default WordInput;
