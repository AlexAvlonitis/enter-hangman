import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import './WordInput.css';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failedLetters: [],
      word: this.props.pickedWord.split('')
    };
    this.handleChange = this.handleChange.bind(this);
  }

  addToFailedLetters(value) {
    const {failedLetters} = this.state;
    failedLetters.push(value);
    this.setState({failedLetters: failedLetters})
  }

  getAllIndexes(value) {
    const {word} = this.state;
    return (word.slice(1, word.length-1)
      .map( (c, i) => c === value ? i+1 : null)
      .filter( e => e )
    ); 
  }

  checkLetter(value) {
    const indexes = this.getAllIndexes(value)
    if(indexes.length > 0) {
      this.revealLetters(indexes);
      this.checkGameStatus();
    } else {
      this.addToFailedLetters(value);
      this.reduceTries();
    }
  }

  revealLetters (indexes) {
    indexes.map( index => {
      this.findInput(index).value = this.state.word[index];
    });
  }

  findInput(index) {
    return document.querySelector(`[data-index='${index}']`);
  }


  reduceTries() {
    this.props.reduceTries()
  }

  checkGameStatus() {
    if (this.wordMatch()) {
      alert("You won!");
      window.location.reload();
    }
  }

  wordMatch() {
    let currentWord = [];
    const fields = document.getElementsByClassName('WordInput-bottom-border-input');

    for (let i = 0; i < fields.length; i++)
      currentWord.push(fields[i].value);

    return (currentWord.join('') === this.state.word.join('')) ? true : false
  }

  handleChange(event) {
    this.checkLetter(event.target.value);
    document.getElementById('letter-input').value = '';
  }

  renderInputs = (word, index) => {
    if (index === 0) {
      return (
        <input
          className="WordInput-bottom-border-input"
          value={word}
          disabled
          key={index}
        />
      )
    } else if (this.state.word.length - 1 === index) {
      return (
        <input
          className="WordInput-bottom-border-input"
          value={word}
          disabled
          key={index}
        />
      )
    } else {
      return (
        <input
          className="WordInput-bottom-border-input"
          disabled
          data-index={index}
          key={index}
        />
      )
    }
  }

  renderInput = (word) => {
    return (
      <div>
        { word.map(this.renderInputs) }
        <div>
          <h3>Enter a letter below</h3>
          <input
            className="WordInput-enter-letter-input"
            id='letter-input'
            autoFocus
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }

  render() {
    const {word, failedLetters} = this.state;
    const {pickedWord} = this.props;
    
    return (  pickedWord && 
      <div className="WordInput-align-center">
        <p>
          <button onClick={() => alert(pickedWord)}>
                Cheat, show word
          </button>
        </p>
          { this.renderInput(word) }
        <p> Letters that don't exist: </p>
        <p> {failedLetters.join(', ')} </p>
      </div>
    );
  }
}

WordInput.propTypes = {
  pickedWord: PropTypes.string.isRequired,
}