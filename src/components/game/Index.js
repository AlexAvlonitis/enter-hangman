import React, { Component } from 'react';
import WordInput from './WordInput';
import CanvasIndex from '../canvas/Index';
import wordsText from '../../words.txt';
import { readFile } from '../../services/readFile'
import './Index.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordsArray: null,
      pickedWord: null,
      tries: 6
    }
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

  reduceTries = () => {
    this.setState({ tries: this.state.tries - 1 }, () => {
      this.isItOverYet();
    });
  }

  isItOverYet = () => {
    if (this.state.tries === 0) {
      alert(`Game Over! \nThe word was: ${this.state.pickedWord}`);
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="Game-Index">
        <div className="Game-Inputs">
          { this.state.wordsArray ?
            <WordInput
              pickedWord={this.state.pickedWord}
              reduceTries={this.reduceTries}
              tries={this.state.tries}
            /> :
            <p>Loading...</p>
          }
        </div>
        <div className="Game-Canvas">
          <CanvasIndex tries={this.state.tries} />
        </div>
      </div>
    );
  }
}

export default Index;
