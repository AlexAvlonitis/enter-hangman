import React, { Component } from 'react';
import WordInput from './WordInput';
import CanvasIndex from '../canvas/Index';
import wordsText from '../../words.txt';
import { readFile } from '../../services/readFile'
import './Index.css';

class Index extends Component {
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

  render() {
    return (
      <div className="Game-Index">
        { this.state.wordsArray ?
          <WordInput pickedWord={this.state.pickedWord} /> :
          <p>Loading...</p>
        }
        <CanvasIndex />
      </div>
    );
  }
}

export default Index;
