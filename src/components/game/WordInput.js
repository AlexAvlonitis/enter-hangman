import React, { Component, Fragment } from 'react';
import './WordInput.css';

export default class WordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      wordProgress: [],
      allLetters: [],
      word: null,
      lives: 5
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
      this.addLetterToWordProgress();
      this.revealLetters(indexes);
      this.checkGameStatus();
    } else {
      this.addToFailedLetters();
      this.reduceLives();
      if (this.state.lives === 1) {
        alert('Game Over');
        window.location.reload();
      }
    }
  }

  revealLetters = (indexes) => {
    indexes.map((index) => {
      this.findInput(index).value = this.state.word[index];
    })
  }

  addLetterToWordProgress = () => {
    this.state.wordProgress.push(this.state.value);
  }

  findInput = (index) => {
    return document.querySelector(`[data-index='${index}']`);
  }

  addToFailedLetters = () => {
    this.state.allLetters.push(this.state.value);
  }

  reduceLives = () => {
    this.setState({ lives: this.state.lives - 1 });
  }

  checkGameStatus = () => {
    if (this.wordMatch()) {
      alert("You won!");
      window.location.reload();
    }
  }

  wordMatch = () => {
    const wordWithoutEdges = this.state.word.slice(1, this.state.word.length - 1);
    return (this.state.wordProgress.join('') === wordWithoutEdges.join('')) ? true : false
  }

  handleChange(event) {
    this.setState({value: event.target.value}, () => {
      this.checkLetter();
      this.findInput('999').value = '';
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
            data-index='999'
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
        <h3>Lives: {this.state.lives} </h3>
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
