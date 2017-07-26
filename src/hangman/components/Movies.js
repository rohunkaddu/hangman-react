import React, { Component } from 'react';
import { Category } from './Category';
import { movies } from './answerList';

export class Movies extends Component {
  render () {
    return <Category name="Movies" wordList={movies} />;
  }
}
