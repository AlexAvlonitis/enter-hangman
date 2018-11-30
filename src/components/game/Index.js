import React, { Component } from 'react';
import WordInput from './WordInput';
import CanvasIndex from '../canvas/Index';
import wordsText from '../../words.txt';
import './Index.css';
import axios from 'axios';
import Loading from '../Loading'

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickedWord: null,
      tries: 6,
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get(wordsText).then( res => {
      this.setState({
         pickedWord: this.randomWordPicker(res.data.split("\n")),
         isLoading: false,
      });
    })
  }

  randomWordPicker(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
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
    const {tries, pickedWord, isLoading} = this.state;
    
    return (
      <div className="Game-Index">
        <div className="Game-Inputs">
          <WordInputWithLoading {
            ...{isLoading, pickedWord, tries, reduceTries: this.reduceTries}}
          />
        </div>
        <div className="Game-Canvas">
          <CanvasIndex {...{tries}} />
        </div>
      </div>
    );
  }
}

export default Index;

const  withLoading = Component => ({isLoading, ...rest}) =>
  isLoading ? <Loading /> : <WordInput {...rest} />

const WordInputWithLoading = withLoading(WordInput);