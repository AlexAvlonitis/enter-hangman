import React, { Component } from 'react';
import WordInput from './WordInput/index.js';
import CanvasIndex from '../canvas/Index';
import animals from '../../animals.txt'
import countries from '../../countries.txt'
import fruits from '../../fruits.txt'
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
    const {score, level, currentWord} = this.state;
    const factor = "aeiouy".match(value) ?  1.5 : 1;

    /* increase score if value isn't yet in currentWord  */
    /* deal with case when value in currentWord because it's the first or last char */
    if (!currentWord.includes(value) 
      || ( (value === currentWord[currentWord.length-1] || value === currentWord[0])
          && !currentWord.slice(1, currentWord.length-1).includes(value)
          )) 
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
    const categories = [animals, countries, fruits]
    const i = Math.floor(Math.random() * categories.length);
    const category = categories[i].match(/\/.+\/.+\/([a-z]+)/)[1];
    
    axios.get(categories[i]).then( res => {
      this.startLevel(res.data, category);
    })
  }

  checkGameStatus(indexes) {
    const { word, currentWord, level } = this.state;
    indexes.map( index => currentWord[index] = word[index]); /* copy correct characted to currentWord */

    if (currentWord.join('') === word.join('')) {
      alert("Good job!");
      if ( level >= 12 ){ /* Max available word in all dictionaries + 1 */
        alert("You won !!")
        window.location.reload();
      }else{
        this.setState({ isLoading: true})
        this.levelUp();
      }
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
      this.setScore(value);
      this.checkGameStatus(indexes);
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
    const categories = [animals, countries, fruits]
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