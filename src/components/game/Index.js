import React, { Component } from 'react';
import WordInput from './WordInput/index.js';
import CanvasIndex from '../canvas/Index';
import animalsText from '../../animals.txt'
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
      isLoading: true,
      level: 1,
      score: 0,
      category: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  isItOverYet() {
    const {word, tries} = this.state;
    if (tries === 0) {
      alert(`Game Over! \nThe word was: ${word.join('')}`);
      window.location.reload();
    }
  }

  reduceTries(value) {
    const {tries, failedLetters} = this.state;
    failedLetters.push(value);
    this.setState({ tries: tries-1, failedLetters }, this.isItOverYet);
  }

  setScore(value) {
    const {score, level} = this.state;
    const factor = "aeiouy".match(value) ?  1.5 : 1;

    this.setState({
      score: score + factor*2 + level
    })
  }

  startLevel(data, category) {
    const {level} = this.state
    const word = this.randomWordPicker(data.split("\n")
             .filter( word => word.length === (1 + level+1)));
    const currentWord = word.map( (char, i) =>   /* set first and last char of currentWord */
           (i === 0 || i === word.length-1) ?  char : null); /* all others null */

    this.setState({
      word,
      currentWord,
      isLoading: false,
      level: level+1,
      tries: 6,
      failedLetters: [],
      category
    });
  }

  levelUp() {
    const categories = [animalsText]
    const i = Math.floor(Math.random() * categories.length);
    const category = categories[i].match(/\/.+\/.+\/([a-z]+)/)[1];
    
    axios.get(categories[i]).then( res => {
      this.startLevel(res.data, category);
    })
  }

  checkGameStatus(indexes) {
    const { word, currentWord } = this.state;
    indexes.map( index => currentWord[index] = word[index]); /* copy correct characted to currentWord */

    if (currentWord.join('') === word.join('')) {
      alert("Good job!");
      this.setState({ isLoading: true})
      this.levelUp();
    }else
      this.setState( {currentWord} );
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
    const {failedLetters} = this.state;
    if(indexes.length > 0) {
      this.revealLetters(indexes);
      this.checkGameStatus(indexes);
      this.setScore(value);
    } else if (!failedLetters.includes(value) && value.match(/[a-z]/i))
      this.reduceTries(value);
  }

  handleChange(event) {
    this.checkLetter(event.target.value);
    document.getElementById('letter-input').value = '';
  }
  
  randomWordPicker(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)].split('');
  }

  componentDidMount() {
    const categories = [animalsText]
    const i = Math.floor(Math.random() * categories.length);
    const category = categories[i].match(/\/.+\/.+\/([a-z]+)/)[1];
    
    axios.get(categories[i]).then( res => {
      this.startLevel(res.data, category);
    })
  }

  render() {
    const { tries, word, isLoading, failedLetters, 
            level, score, category,
          } = this.state;

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
          <CanvasIndex {...{tries, level: level-1, score, category}} />
        </div>
      </div>
    );
  }
}

export default Index;

const  withLoading = Component => ({isLoading, ...rest}) =>
  isLoading ? <Loading /> : <WordInput {...rest} />

const WordInputWithLoading = withLoading(WordInput);