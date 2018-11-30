import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const  renderInputs = word => (char, index) => {
    if (index === 0 || word.length - 1 === index) {
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

const WordInput = ({word, onChange}) => {
    return (   
      <div className="WordInput-align-center">
        { word.map(renderInputs(word)) }
        <div>
          <h3>Enter a letter below</h3>
          <input
            className="WordInput-enter-letter-input"
            id='letter-input'
            autoFocus
            onChange={onChange}
          />
        </div>
      </div>
    );
}


export default WordInput;

WordInput.propTypes = {
  word: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}