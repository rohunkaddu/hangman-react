import React, { Component } from 'react';



export class Win extends Component {
  WinLogic = () => {
    for (let i = 0; i < this.props.currentWord.length; i++) {
      var leftoverspaces = this.props.currentWord.length
      if (this.props.currentWord[i] !== '_ ') {
        leftoverspaces -= 1
      } else if (leftoverspaces === 0) {
        return (
          <div className='congratsbox'>You won!</div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.WinLogic}
      </div>
    );
  }
}
