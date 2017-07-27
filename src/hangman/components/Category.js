import React, { Component } from 'react';
import { AppHeader } from './Header';
import { Images } from './images';
import { Win } from './winnerbox';
import { letterList } from '../utils/strings';
import { replaceAt, upperCaseFirstLetter } from '../utils/strings'


function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

export class Category extends Component {

  componentWillMount() {
    this.newGame();
  }


  componentDidMount() {
    let self = this
    for (let i = 0; i < letterList.length; i++) {
       let div = document.getElementsByClassName('letterButtons')[i]
       div.addEventListener('click', function () {
         let lowercasedWord = self.state.currentWord.toLowerCase()
         var letter = this.innerHTML
         if (self.debug) { console.log('Letter Clicked: ' + letter) }
         var line = self.state.currentDisplayedWord
         if (lowercasedWord.indexOf(letter) !== -1) {
           while (lowercasedWord.indexOf(letter) !== -1) {
             if (self.debug) { console.log('Line Before: ' + line) }
             // line = "_ _ _  _ _ _ _ _ _ _ _ _ "
             // lowercasedWord = "the godfather"
             line = replaceAt(line, lowercasedWord.indexOf(letter) * 2, letter);
             if (self.debug) { console.log('Line After: ' + line) }

             if (self.debug) { console.log('Current Word Before: ' + lowercasedWord) }
             lowercasedWord = replaceAt(lowercasedWord, lowercasedWord.indexOf(letter), ' ');
             if (self.debug) { console.log('Current Word After: ' + lowercasedWord) }

             // "t h e   g o d f a t h e r" => ["t h e", "g o d f a t h e r"] => ["T h e", "G o d f a t h e r"] => "T h e   G o d f a t h e r"]
             let upperCasedWords = line.split('   ').map(upperCaseFirstLetter).join('   ');
             if (self.debug) { console.log('Upper Cased Words: ' + upperCasedWords) }
            self.updateCurrentDisplayedWord(upperCasedWords);
            }
         } else {
           self.handleWrong('add')
         }
       });
     }
  }

  newGame = () => {
    var word = ""
    let currentWord = this.props.wordList[getRandomIndex(this.props.wordList.length)]
    for (var i = 0; i < currentWord.length; i++) {
      if (currentWord.charAt(i) === ' ') {
        word += "  "
      } else {
        word += "_ "
      }
    }
    console.log(word);
    this.setState({
      clicked: false,
      errors: 0,
      guesses: [],
      over: false,
      won: false,
      currentWord,
      currentDisplayedWord: word,
    });
  }


  updateCurrentWord = (newWord) => {
    this.setState({
      currentWord: newWord
    })
  }

  updateCurrentDisplayedWord = (newWord) => {
    this.setState({
      currentDisplayedWord: newWord
    })
  }

  handleClick = () => {
    this.setState({
      clicked: true,
      errors: 7,
      over: true,
    });
  }

  handleWrong = (type) => {
    this.setState({
      errors: type === 'add' ? this.state.errors + 1 : this.state.errors,
    });


  }

getTitle = () => {
  if(this.state.errors < 7) {
    return ('')
  } else if (this.state.errors === 7){
    return ('You lost. Try again?')
  } else {
    return ('')
  }
}

  mapThroughLetters = (letter) => {
    return (
      <div className="letters"><div className="letterButtons">{letter}</div></div>
    )
  }

  render () {
    return (
      <div style={{textAlign: "center"}}>
        <AppHeader />
        <h1>{ this.props.name }</h1>
        <Images errors={this.state.errors} />
        <div className="letterbox">
          {letterList.map(this.mapThroughLetters)}
        </div>
        <div>
          <h1 id="line" style={{whiteSpace: "pre", fontSize: 80}}>{this.state.currentDisplayedWord}</h1>
        </div>
        <button className="gameButtons" onClick={this.handleClick}>Solution</button>
        <a href="http://localhost:3001/categories?numOfPlayers=1button"><button className="gameButtons">New Category</button></a>
        <button
          className="gameButtons"
          onClick={this.newGame}
        >
          New Game
        </button>

        <h1>{this.state.clicked ? this.state.currentWord : null}</h1>
        <h1 id="answer" style={{fontSize:100}}>{ this.state.errors === 7 ? 'You lost. Try again?' : null }</h1>
        <Win currentWord={this.state.currentDisplayedWord} />
      </div>
    );
  }
}
