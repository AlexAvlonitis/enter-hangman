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
      tries: 5
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
    this.setState({ tries: this.state.tries - 1 });
    if (this.state.tries === 1) {
      alert('Game Over');
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="Game-Index">
        { this.state.wordsArray ?
          <WordInput
            pickedWord={this.state.pickedWord}
            reduceTries={this.reduceTries}
            tries={this.state.tries}
          /> :
          <p>Loading...</p>
        }
        <CanvasIndex />
      </div>
    );
  }
}

export default Index;
