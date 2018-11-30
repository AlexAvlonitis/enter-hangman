import React, { Component } from 'react';
import WordInput from './WordInput/index.js';
import CanvasIndex from '../canvas/Index';
import wordsText from '../../words.txt';
import './Index.css';
import axios from 'axios';
import Loading from '../Loading';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failedLetters: [],
      currentWord: [],
      word: null,
      tries: 6,
      isLoading: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  isItOverYet() {
    const {word, tries} = this.state;
    if (tries === 0) {
      alert(`Game Over! \nThe word was: ${word.join('')}`);
      window.location.reload();
    }
  }

  addToFailedLetters(value) {
    const {failedLetters} = this.state;
    if (failedLetters.includes(value) || !value.match(/[a-z]/i))
      return false;
    failedLetters.push(value);
    this.setState({ failedLetters });
    return true;
  }
  
  reduceTries() {
    const {tries} = this.state;
    this.setState({ tries: tries - 1 }, () => {
      this.isItOverYet();
    });
  }

  revealLetters (indexes) {
    const {word} = this.state;
    indexes.map( index => 
      document.querySelector(`[data-index='${index}']`).value = word[index]
    );
  }

  getAllIndexes(value) {
    const {word} = this.state;
    return (word.slice(1, word.length-1)
      .map( (c, i) => c === value ? i+1 : null)
      .filter( e => e )
    ); 
  }

  checkLetter(value) {
    const indexes = this.getAllIndexes(value);
    if(indexes.length > 0) {
      this.revealLetters(indexes);
      this.checkGameStatus(indexes);
    } else if (this.addToFailedLetters(value))
      this.reduceTries();
  }

  handleChange(event) {
    this.checkLetter(event.target.value);
    document.getElementById('letter-input').value = '';
  }

  checkGameStatus(indexes) {
    const { word, currentWord } = this.state;
    indexes.map( index => currentWord[index] = word[index] )
    if (currentWord.join('') === word.join('')) {
      alert("You won!");
      window.location.reload();
    }else
      this.setState( {currentWord} )
  }
  
  randomWordPicker(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)].split('');
  }
  
  componentDidMount() {
    axios.get(wordsText).then( res => {
      const word = this.randomWordPicker(res.data.split("\n")
               .filter( word => word.length > 2));
      const currentWord = word.map( (char, i) =>
             (i === 0 || i === word.length-1) ?  char : null);
      this.setState({
        word,
        currentWord,
        isLoading: false,
      });
    })
  }

  render() {
    const {tries, word, isLoading, failedLetters} = this.state;

    return ( word &&
      <div className="Game-Index">
        <div className="Game-Inputs">
          <p>
            <button onClick={() => alert(word.join(''))}>
                Cheat, show word
            </button>
          </p>
          <WordInputWithLoading {
            ...{ isLoading, word,
                onChange: this.handleChange
              }
            }
          />
          <p> Letters that don't exist: </p>
          <p> {failedLetters.join(', ')} </p>
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