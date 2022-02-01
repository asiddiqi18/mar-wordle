import React, { Component, useState, useEffect } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import {
  Button,
  Modal,
  Toast,
  Row,
  Col,
  ToastContainer,
} from "react-bootstrap";
import { getWord } from "../utils/wordPicker";
import { isWord } from "../utils/wordApi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  resetBuilder() {
    this.setState(this.initialState);
  }

  get initialState() {
    return {
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
      gameOverModalDisplayed: false,
      alertDisplayed: false,
      alertMsg: undefined,
      gameWon: false,
      answer: getWord(),
      charStatus: {
        successChars: [],
        partialChars: [],
        wrongChars: [],
      },
    };
  }

  showModal() {
    this.setState({ gameOverModalDisplayed: true });
  }

  hideModal() {
    this.setState({ gameOverModalDisplayed: false });
  }

  setAlertShown(bool, msg) {
    this.setState({ alertMsg: msg });
    this.setState({ alertDisplayed: bool });
  }

  handleKeyPress(letter) {
    if (this.state.gameWon) {
      return;
    }

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
    if (this.state.guessNumber == 5) {
      console.log("Out of guesses ");
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
    if (this.state.gameWon) {
      return;
    }

    console.log("Handling enter...");
    let enteredGuess = this.state.board[this.state.guessNumber].guess;

    if (enteredGuess === this.state.answer) {
      super.setState({ gameWon: true });
      this.showModal();
    } else if (this.state.guessNumber == 4) {
      this.showModal();
    }

    if (enteredGuess.length !== 5) {
      this.setAlertShown(true, "Not enough letters");
      return;
    }

    for (let index = 0; index < this.state.guessNumber; index++) {
      const prevGuess = this.state.board[index].guess;
      if (prevGuess === enteredGuess) {
        this.setAlertShown(true, "You have already guessed this");
        return;
      }
    }

    if (!isWord(enteredGuess)) {
      this.setAlertShown(true, "Not a valid word");
      return;
    }

    this.setState({ guessNumber: this.state.guessNumber + 1 });
    console.log("Pushing to board...");

    var resultsList = [];

    let wordSet = new Set(this.state.answer.split(""));

    for (let index = 0; index < 5; index++) {
      if (enteredGuess[index] === this.state.answer[index]) {
        // success
        this.state.charStatus.successChars.push(enteredGuess[index]);
        resultsList.push("success");
      } else if (wordSet.has(enteredGuess[index])) {
        // partial
        this.state.charStatus.partialChars.push(enteredGuess[index]);
        resultsList.push("partial");
      } else {
        // fail
        this.state.charStatus.wrongChars.push(enteredGuess[index]);
        resultsList.push("wrong");
      }
    }

    this.state.board[this.state.guessNumber].match = resultsList;
    super.setState(this.state.board);
  }

  handleReset() {
    console.log("TEST");
    this.hideModal();
    this.resetBuilder();
  }

  gameOverModal() {
    if (this.state.gameWon) {
      return (
        <Modal show={this.state.gameOverModalDisplayed} onHide={this.hideModal}>
          <Modal.Body className="success-light p-5">
            <h3 className="text-center">Congrats! You won!</h3>
            <div className="row">
              <p className="text-center">
                You guessed the word {this.state.answer} in {this.state.guessNumber}{" "}
                guesses.
              </p>
            </div>
            <div class="row mt-5">
              <Button
                variant="light"
                className="success shadow"
                onClick={this.handleReset}
              >
                Restart
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <Modal show={this.state.gameOverModalDisplayed} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Oh no! You lost!</Modal.Title>
          </Modal.Header>
          <Modal.Body>The word was {this.state.answer}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="success"
              onClick={this.handleReset}
            >
              Restart
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  render() {
    console.log("the word is " + this.state.answer);
    return (
      <div>
        <Row>
          <Col xs={6}>
            <ToastContainer className="m-3" position="top-center">
              <Toast
                onClose={() => this.setAlertShown(false)}
                show={this.state.alertDisplayed}
                delay={3000}
                autohide
              >
                <Toast.Body>{this.state.alertMsg}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>

        {this.gameOverModal()}

        <div class="d-flex align-items-center justify-content-center flex-column min-vh-100">
          <div className="mt-5">
            <h1 className="text-center title">Mar's Wordle</h1>
          </div>
          <div class="mt-auto">
            <Board
              board={this.state.board}
              guessNumber={this.state.guessNumber}
            ></Board>
          </div>
          <div class="mt-auto bottom-margin">
            <Keyboard
              onKeyPress={this.handleKeyPress}
              onBackSpace={this.handleBackspace}
              onEnter={this.handleEnter}
              charStatus={this.state.charStatus}
            ></Keyboard>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
