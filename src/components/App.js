import React, { Component, useState, useEffect } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import ActionPanel from "./actionPanel";
import _ from "lodash";

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

  getEmptyBoard() {
    var emptyBoard = [];
    _.times(5, (i) => {
      emptyBoard.push({
        guess: "",
        match: [],
      });
    });
    return emptyBoard;
  }

  get initialState() {
    return {
      board: this.getEmptyBoard(),
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

  showAlert(bool, msg) {
    this.setState({ alertMsg: msg });
    this.setState({ alertDisplayed: bool });
  }

  handleKeyPress(letter) {
    if (this.state.gameWon) {
      return;
    }

    if (this.state.board[this.state.guessNumber].guess.length !== 5) {
      this.state.board[this.state.guessNumber].guess += letter;
      super.setState(this.state.board);
    }
  }

  handleBackspace() {
    if (this.state.guessNumber == 5) {
      return;
    }

    this.state.board[this.state.guessNumber].guess = this.state.board[
      this.state.guessNumber
    ].guess.slice(0, -1);
    super.setState({ board: this.state.board });
  }

  handleEnter() {
    if (this.state.gameWon) {
      return;
    }

    const { board, guessNumber, answer, charStatus } = this.state;

    let enteredGuess = board[guessNumber].guess;

    if (enteredGuess.length !== 5) {
      this.showAlert(true, "Not enough letters");
      return;
    }

    for (let index = 0; index < guessNumber; index++) {
      const prevGuess = board[index].guess;
      if (prevGuess === enteredGuess) {
        this.showAlert(true, "You have already guessed this");
        return;
      }
    }

    if (!isWord(enteredGuess)) {
      this.showAlert(true, "Not a valid word");
      return;
    }

    if (enteredGuess === answer) {
      super.setState({ gameWon: true });
      this.showModal();
    } else if (guessNumber == 4) {
      this.showModal();
    }

    var resultsList = [];

    let wordSet = new Set(answer.split(""));

    for (let index = 0; index < 5; index++) {
      if (enteredGuess[index] === answer[index]) {
        // success
        charStatus.successChars.push(enteredGuess[index]);
        resultsList.push("success");
      } else if (wordSet.has(enteredGuess[index])) {
        // partial
        charStatus.partialChars.push(enteredGuess[index]);
        resultsList.push("partial");
      } else {
        // fail
        charStatus.wrongChars.push(enteredGuess[index]);
        resultsList.push("wrong");
      }
    }

    board[guessNumber].match = resultsList;
    this.setState({ guessNumber: guessNumber + 1 });
    super.setState({ board: board });
  }

  handleReset() {
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
                You guessed the word {this.state.answer} in{" "}
                {this.state.guessNumber} guesses.
              </p>
            </div>
            <div className="row mt-5">
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

  invalidToast() {
    return (
      <Row>
        <ActionPanel
          onKeyPress={this.handleKeyPress}
          onBackSpace={this.handleBackspace}
          onEnter={this.handleEnter}
        />
        <Col xs={6}>
          <ToastContainer className="mt-2" position="top-center">
            <Toast
              onClose={() => this.showAlert(false)}
              show={this.state.alertDisplayed}
              delay={3000}
              autohide
            >
              <Toast.Body>{this.state.alertMsg}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    );
  }

  gameOverToast() {
    if (!this.state.gameWon || this.state.gameOverModalDisplayed) {
      return;
    }
    return (
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={this.state.gameWon} animation={false}>
          <Toast.Body>
            <div className="d-flex justify-content-center align-items-center">
              <div className="p-2 flex-fill ">
                <strong className="me-auto ">Game Over!</strong>
                <br />
                <small>
                  The word was{" "}
                  <strong>{this.state.answer.toLowerCase()}</strong>
                </small>
              </div>
              <div className="p-2 flex-fill ">
                <Button
                  variant="light"
                  className="float-end success shadow"
                  onClick={this.handleReset}
                >
                  Restart
                </Button>
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }

  render() {
    console.log("the word is " + this.state.answer);
    return (
      <div>
        {this.invalidToast()}
        {this.gameOverModal()}

        <div className="d-flex align-items-center justify-content-center flex-column min-vh-100">
          <div className="mt-5">
            <h1 className="text-center title">Mar's Wordle</h1>
          </div>
          <div className="mt-auto">
            <Board
              board={this.state.board}
              guessNumber={this.state.guessNumber}
            ></Board>
          </div>
          <div className="mt-auto bottom-margin">
            <Keyboard
              onKeyPress={this.handleKeyPress}
              onBackSpace={this.handleBackspace}
              onEnter={this.handleEnter}
              charStatus={this.state.charStatus}
            ></Keyboard>
          </div>
        </div>
        {this.gameOverToast()}
      </div>
    );
  }
}

export default App;
