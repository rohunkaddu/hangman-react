import React, { Component } from 'react';
import { AppHeader } from './Header';
import { Images } from './images';
import { Win } from './winnerbox';
import { letterList } from '../utils/strings';
import { replaceAt, upperCaseFirstLetter } from '../utils/strings'


export class Category extends Component {
  constructor(props) {
    super(props);

    this.randindex = Math.floor(Math.random() * props.wordList.length);
    this.updateCurrentWord = this.updateCurrentWord.bind(this);
    this.updateCurrentDisplayedWord = this.updateCurrentDisplayedWord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleWrong = this.handleWrong.bind(this);

    var word = ""
    let wordList = props.wordList
    let currentWord = wordList[this.randindex]
    for (var i = 0; i < wordList[this.randindex].length; i++) {
      if (wordList[this.randindex].charAt(i) === ' ') {
        word += "  "
      } else {
        word += "_ "
      }
    }

    console.log(word);

    this.state = {
      clicked: false,
      errors: 0,
      currentWord: currentWord,
      currentDisplayedWord: word
    };
  }

  updateCurrentWord(newWord) {
    this.setState({
      currentWord: newWord
    })
  }

  updateCurrentDisplayedWord(newWord) {
    this.setState({
      currentDisplayedWord: newWord
    })
  }

  handleClick() {
    this.setState({
      clicked: true,
      errors: 7,
    });
  }

  handleWrong(type) {
    this.setState({
      errors: type === 'add' ? this.state.errors + 1 : this.state.errors,
    });
  }

  debug = false

  componentDidMount = () => {
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

  mapThroughLetters = (letter) => {
    return (
      <div className="letters"><div className="letterButtons">{letter}</div></div>
    )
  }

  render () {
    return (
      <div style={{textAlign: "center"}}>
        <AppHeader />
        <h1>{this.props.name}</h1>
        <Win currentWord={this.state.currentWord}/>
        <Images errors={this.state.errors} />
        <div className="letterbox">
        {letterList.map(this.mapThroughLetters)}
      </div>
      <div>
        <h1 id="line" style={{whiteSpace: "pre", fontSize: 80}}>{this.state.currentDisplayedWord}</h1>
      </div>
      <button onClick={this.handleClick}>Solution</button>
      <h1>{this.state.clicked ? this.props.wordList[this.randindex] : null}</h1>
      </div>
    );
  }
}
