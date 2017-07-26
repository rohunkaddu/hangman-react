import React, { Component } from 'react';
import { Category } from './Category';
import { games } from './answerList';

export class Videogames extends Component {
  render () {
    return <Category name="Video Games" wordList={games}/>;
  }
}
