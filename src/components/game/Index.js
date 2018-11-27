import React, { Component } from 'react';
import WordInput from './WordInput';
import CanvasIndex from '../canvas/Index';
import { readFile } from '../../services/readFile'
import './Index.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordsArray: null,
      pickedWord: null,
      tries: 6,
      level: 1
    }
  }

  componentDidMount() {
    const {level} = this.state;
    const wordsArray = readFile(level);
    console.log(wordsArray)
    this.setState({
      wordsArray
    }, () => {
      this.randomWordPicker();
    });
  }

  randomWordPicker() {
    const {wordsArray} = this.state;
    const pickedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    this.setState({pickedWord});
  }

  reduceTries = () => {
    const {tries} = this.state;
    this.setState({ tries: tries - 1 }, () => {
      this.isItOverYet();
    });
  }

  isItOverYet() {
    if (this.state.tries === 0) {
      alert(`Game Over! \nThe word was: ${this.state.pickedWord}`);
      window.location.reload();
    }
  }

  render() {
    const {tries, pickedWord} = this.state;
    return (
      <div className="Game-Index">
        <div className="Game-Inputs">
          { this.state.wordsArray 
            ? <WordInput {...{pickedWord, tries, reduceTries: this.reduceTries }} /> 
            : <p>Loading...</p>
          }
        </div>
        <div className="Game-Canvas">
          <CanvasIndex {...{tries}} />
        </div>
      </div>
    );
  }
}

export default Index;
