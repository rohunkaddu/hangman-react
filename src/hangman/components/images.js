import React, { Component } from 'react';
import hanger1 from './hanger1.svg';
import hanger2 from './hanger2.svg';
import hanger3 from './hanger3.svg';
import hanger4 from './hanger4.svg';
import hanger5 from './hanger5.svg';
import hanger6 from './hanger6.svg';
import hanger7 from './hanger7.svg';
import hanger8 from './hanger8.svg';


export class Images extends Component {
  constructor(props) {
    super(props);

    this.hangers = [hanger1, hanger2, hanger3, hanger4, hanger5, hanger6, hanger7, hanger8]
  }
  render() {
    return (
      <div>
        <img src= { this.hangers[this.props.errors] } className='gallows' alt="hi"/>
      </div>
    );
  }
}

export default Images;
