import React, { Component } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        {
          guess: "",
          match: "nnnnn",
        },
        {
          guess: "",
          match: "nnnnn",
        },
        {
          guess: "",
          match: "nnnnn",
        },
        {
          guess: "",
          match: "nnnnn",
        },
        {
          guess: "",
          match: "nnnnn",
        },
      ],
      guessNumber: 0,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleKeyPress(letter) {
    console.log(`Key pressed: ${letter}`);
    console.log(
      `Guess length: ${
        this.state.board[this.state.guessNumber].guess.length
      } Guess number: ${this.state.guessNumber}`
    );

    if (this.state.board[this.state.guessNumber].guess.length != 5) {
      this.state.board[this.state.guessNumber].guess += letter;
      super.setState(this.state.board);
    }

    // if (this.state.board[this.state.guess].length != 5) {
    //   console.log(`Adding letter to guess... ${this.state.guess}`);
    //   this.state.board[this.state.guess] += letter;
    //   super.setState(this.state.board);
    //   console.log(this.state.board[this.state.guess]);
    // }
  }

  handleBackspace() {
    console.log("Handling back space...");
    this.state.board[this.state.guessNumber].guess = this.state.board[
      this.state.guessNumber
    ].guess.slice(0, -1);
    super.setState({ board: this.state.board });
    console.log(this.state);
  }

  handleEnter() {
    console.log("Handling enter...");
    if (this.state.board[this.state.guessNumber].guess.length == 5) {
      this.state.guessNumber += 1;
      console.log("Pushing to board...");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="mt-5">
            <Board
              board={this.state.board}
              guessNumber={this.state.guessNumber}
            ></Board>
            <Keyboard
              onKeyPress={this.handleKeyPress}
              onBackSpace={this.handleBackspace}
              onEnter={this.handleEnter}
            ></Keyboard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
