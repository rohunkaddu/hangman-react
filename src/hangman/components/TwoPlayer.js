import React, { Component } from 'react';
import { Category } from './Category';
import { AppHeader } from './Header';
import './style.css';

export class TwoPlayer extends Component {
  state = {
    newWord: '',
    clicked: true,
  }

  onItemChange = (event) => {
    const newWord = event.target.value;
    this.setState({ newWord });
  }

  handleClick = () => {
    this.setState({
      clicked: false
    });
  }

  render() {
    const { newWord } = this.state;
    if (this.state.clicked) {
      return (
        <div className="holder">
          <h1 className="header">Type a word while the other player looks away.</h1>
          <input
            onChange={this.onItemChange}
            value={newWord}
            placeholder="Type a word..."
            className="input"
          />
        <button onClick={this.handleClick} className="button">=></button>
        </div>
      );
    }
    return <Category name="Two Player" wordList={[newWord]} />
  }
}
