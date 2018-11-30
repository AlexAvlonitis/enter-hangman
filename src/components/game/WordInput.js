import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import './WordInput.css';

export default class WordInput extends Component {

  renderInputs = word => (char, index) => {
    if (index === 0) {
      return (
        <input
          className="WordInput-bottom-border-input"
          value={char}
          disabled
          key={index}
        />
      )
    } else if (word.length - 1 === index) {
      return (
        <input
          className="WordInput-bottom-border-input"
          value={char}
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

  render() {
    const {word, failedLetters, handleChange} = this.props;
    console.log(word)
    return (   
      <div className="WordInput-align-center">
        { word.map(this.renderInputs(word)) }
        <div>
          <h3>Enter a letter below</h3>
          <input
            className="WordInput-enter-letter-input"
            id='letter-input'
            autoFocus
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

WordInput.propTypes = {
  word: PropTypes.array.isRequired,
}