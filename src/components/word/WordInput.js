import React, { Component } from 'react';
import wordsText from '../../words.txt';
import { readFile } from '../../services/readFile'
import './WordInput.css';

class WordInput extends Component {
  constructor(props) {
    super(props);

    this.state = { wordsArray: null, pickedWord: null }
  }

  componentDidMount = () => {
    const wordsArray = readFile(wordsText);
    this.setState({
      wordsArray
    }, () => {
      this.randomWordPicker();
    });
  }

  randomWordPicker = () => {
    const {wordsArray} = this.state;
    const pickedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    this.setState({pickedWord});
  }

  renderWord = () => {
    return (
      <div>
        <p> Welcome </p>
        <p> This is the picked word: {this.state.pickedWord}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="WordInput">
        { this.state.wordsArray ?
          this.renderWord() :
          <p>Loading...</p>
        }
      </div>
    );
  }
}

export default WordInput;
