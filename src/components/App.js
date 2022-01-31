import React, { Component, useState } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import { Button, Modal } from "react-bootstrap";
import getWord from "../wordPicker";

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
      showGameOverModal: false,
      gameWon: false,
      answer: getWord(),
      charStatus: {
        successChars: [],
        partialChars: [],
        wrongChars: [],
      },
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ showGameOverModal: true });
  }

  hideModal() {
    this.setState({ showGameOverModal: false });
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
    if (this.state.guessNumber == 4) {
      return;
    }

    console.log("Handling back space...");
    this.state.board[this.state.guessNumber].guess = this.state.board[
      this.state.guessNumber
    ].guess.slice(0, -1);
    super.setState({ board: this.state.board });
    console.log(this.state);
  }

  handleEnter() {
    console.log("Handling enter...");
    let enteredGuess = this.state.board[this.state.guessNumber].guess;

    if (enteredGuess === this.state.answer) {
      super.setState({ gameWon: true });
      this.showModal();
    } else if (this.state.guessNumber == 4) {
      this.showModal();
    }

    if (enteredGuess.length === 5) {
      this.setState({ guessNumber: this.state.guessNumber + 1 });
      console.log("Pushing to board...");

      // for (let index = 0; index < 5; index++) {
      //   if (enteredGuess[index] === this.state.answer[index].toUpperCase()) {
      //     console.log(`Found a match of ${enteredGuess[index]} at index ${index}`)
      //   }
      // }

      var resultsList = [];

      for (let index = 0; index < 5; index++) {
        var indexFound = this.state.answer.indexOf(enteredGuess[index]);
        if (indexFound === index) {
          resultsList.push("success");
          this.state.charStatus.successChars.push(enteredGuess[index]);
        } else if (indexFound !== -1) {
          this.state.charStatus.partialChars.push(enteredGuess[index]);
          resultsList.push("partial");
        } else {
          this.state.charStatus.wrongChars.push(enteredGuess[index]);
          resultsList.push("wrong");
        }
      }

      // console.log(`resultsList = ${resultsList}`)

      this.state.board[this.state.guessNumber].match = resultsList;
      super.setState(this.state.board);

      console.log(this.state);
    }
  }

  gameOverModal() {
    if (this.state.gameWon) {
      return (
        <Modal show={this.state.showGameOverModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Congrats! You won!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You guessed the word {this.state.answer} in {this.state.guessNumber}{" "}
            guesses.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Restart</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal show={this.state.showGameOverModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Fuck! You lost!</Modal.Title>
          </Modal.Header>
          <Modal.Body>The word was {this.state.answer}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Restart</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>The answer is {this.state.answer}</h1>
        {this.gameOverModal()}
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
              charStatus={this.state.charStatus}
            ></Keyboard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
