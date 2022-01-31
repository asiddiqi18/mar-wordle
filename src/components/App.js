import React, { Component } from "react";
import Board from "./board";
import Keyboard from "./keyboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        {
          guess: "",
          match: [],
        },
        {
          guess: "",
          match: [],
        },
        {
          guess: "",
          match: [],
        },
        {
          guess: "",
          match: [],
        },
        {
          guess: "",
          match: [],
        },
      ],
      guessNumber: 0,
      answer: "MOUNT"
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

    if (this.state.board[this.state.guessNumber].guess.length !== 5) {
      this.state.board[this.state.guessNumber].guess += letter;
      super.setState(this.state.board);
    }
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
    let enteredGuess = this.state.board[this.state.guessNumber].guess

    if (enteredGuess === this.state.answer) {
      console.log("Congrats, you won!")
    }
    else if (this.state.guessNumber == 4) {
      console.log("You lost 🤣")
    }

    if (enteredGuess.length === 5) {
      this.setState({guessNumber: this.state.guessNumber + 1})
      console.log("Pushing to board...");

      // for (let index = 0; index < 5; index++) {
      //   if (enteredGuess[index] === this.state.answer[index].toUpperCase()) {
      //     console.log(`Found a match of ${enteredGuess[index]} at index ${index}`)
      //   }
      // }

      var resultsList = []

      for (let index = 0; index < 5; index++) {
        var indexFound = this.state.answer.indexOf(enteredGuess[index])
        if (indexFound === index) {
          resultsList.push("success")
        } else if (indexFound !== -1) {
          resultsList.push("partial")
        } else {
          resultsList.push("wrong")
        }
      }

      // console.log(`resultsList = ${resultsList}`)

      this.state.board[this.state.guessNumber].match = resultsList;
      super.setState(this.state.board);

      console.log(this.state)

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
