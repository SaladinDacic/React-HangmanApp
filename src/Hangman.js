import React, { Component } from "react";
import {randomWord} from "./words";
import AlphaButton from "./AlphaButton";
import "./Hangman.css";

import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    let rand = randomWord()
    this.state = { 
      nWrong: 0, 
      nRight: 0,
      guessed: new Set(), 
      wonSet: new Set(rand.split("")),
      answer: rand
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => this.state.nWrong === this.props.maxWrong
        ?ltr
        :(this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(ltr) {
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      nRight: st.nRight + (st.answer.includes(ltr)? 1 : 0)
    }));
    
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return <AlphaButton handleGuess={this.handleGuess} dis={this.state.guessed}/>
  }

  handleRestart(){
    this.setState({nWrong: 0, guessed: new Set(), answer: randomWord(), nRight: 0})
  }
  
  /** render: render game */
  render() {
    // console.log(this.state.nRight === [...this.state.wonSet].length, this.state.wonSet)
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img alt={this.state.nWrong} src={this.props.images[this.state.nWrong]} />
        <p>Number of wrong guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.state.nWrong===this.props.maxWrong
        ?<p>You Lose!!</p>:
        this.state.nRight === [...this.state.wonSet].length?
        <p>You won!!</p>:
        <div className='Hangman-btns'>{this.generateButtons()}</div>}
        <br/>
        <button className={"Hangman-rest"} onClick={this.handleRestart}>Restart!!</button>
      </div>
    );
  }
}

export default Hangman;
