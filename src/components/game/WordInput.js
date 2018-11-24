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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pickedWord !== this.props.pickedWord) {
      this.setState({word: this.props.pickedWord.split('')})
    }
  }

  checkLetter = (index) => {
    if(this.state.value === this.state.word[index]) {
      this.addLetterToWordProgress();
      this.checkGameStatus();
      this.findInput(index).setAttribute('disabled', true);
    } else {
      this.addToFailedLetters();
      this.reduceLives();
      this.findInput(index).value = '';
      if (this.state.lives === 1) {
        alert('Game Over');
        window.location.reload();
      }
    }
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
    const datasetIndex = event.target.dataset.index;

    this.setState({value: event.target.value}, () => {
      this.checkLetter(datasetIndex);
    });
  }

  renderInputs = (word, index) => {
    if (index === 0) {
      return (
        <input
          value={word}
          disabled
          key={index}
        />
      )
    } else if (this.state.word.length - 1 === index) {
      return (
        <input
          value={word}
          disabled
          key={index}
        />
      )
    } else {
      return (
        <input
          onChange={this.handleChange}
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
      </div>
    )
  }

  renderPickedWord = () => {
    return (
      <Fragment>
        <button onClick={() => alert(this.props.pickedWord)}>Cheat, show word</button>
      </Fragment>
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
