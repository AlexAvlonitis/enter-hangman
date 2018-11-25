import React, { Component, Fragment } from 'react';
import './WordInput.css';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      allLetters: [],
      word: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pickedWord !== this.props.pickedWord) {
      this.setState({word: this.props.pickedWord.split('')})
    }
  }

  getAllIndexes() {
    let indexes = [], i = -1;

    while ((i = this.state.word.indexOf(this.state.value, i + 1)) != -1) {
      if(i === 0) { continue; } // don't save if value is 0, because it's the first revealed letter
      if(i === this.state.word.length - 1) { continue; } // same as above for last letter
      indexes.push(i);
    }
    return indexes;
  }

  checkLetter = () => {
    const indexes = this.getAllIndexes()
    if(indexes.length > 0) {
      this.revealLetters(indexes);
      this.checkGameStatus();
    } else {
      this.addToFailedLetters();
      this.reduceTries();
    }
  }

  revealLetters = (indexes) => {
    indexes.map((index) => {
      this.findInput(index).value = this.state.word[index];
    })
  }

  findInput = (index) => {
    return document.querySelector(`[data-index='${index}']`);
  }

  addToFailedLetters = () => {
    this.state.allLetters.push(this.state.value);
  }

  reduceTries = () => {
    this.props.reduceTries()
  }

  checkGameStatus = () => {
    if (this.wordMatch()) {
      alert("You won!");
      window.location.reload();
    }
  }

  wordMatch = () => {
    let currentWord = [];
    const fields = document.getElementsByClassName('WordInput-bottom-border-input');

    for (let i = 0; i < fields.length; i++) {
      currentWord.push(fields[i].value)
    };

    return (currentWord.join('') === this.state.word.join('')) ? true : false
  }

  handleChange(event) {
    this.setState({value: event.target.value}, () => {
      this.checkLetter();
      document.getElementById('letter-input').value = '';
    });
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

  renderInput = () => {
    return (
      <div>
        { this.state.word.map(this.renderInputs) }
        <div>
          <h3>Enter a letter bellow</h3>
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

  renderPickedWord = () => {
    return (
      <button onClick={() => alert(this.props.pickedWord)}>
        Cheat, show word
      </button>
    )
  }

  render() {
    return (
      <div>
        <h3>Tries: {this.props.tries} </h3>
        <p> Picked Word: {this.renderPickedWord()} </p>
        <p> Letters that don't exist: </p>
        <p> {this.state.allLetters.join(', ')} </p>
        { this.state.word ?
          this.renderInput() :
          <p> Loading... </p>
        }
      </div>
    );
  }
}
