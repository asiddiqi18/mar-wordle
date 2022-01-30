import React, { Component } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [""],
      guess: 0,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleKeyPress(letter) {
    console.log(`Key pressed: ${letter}`)
    console.log(`Debug: ${this.state.board.length} ${this.state.guess}`)

    if (this.state.board[this.state.guess].length != 5) {
      console.log(`Adding letter to guess... ${this.state.guess}`)
      this.state.board[this.state.guess] += letter;
      super.setState(this.state.board);
      // console.log(this.state.board[this.state.guess]);
    }
  }

  handleBackspace() {
    console.log("Handling back space...")
    this.state.board[this.state.guess] = this.state.board[this.state.guess].slice(0, -1);
    super.setState({board: this.state.board});
    console.log(this.state)
  }

  handleEnter() {
    console.log("Handling enter...")
    if (this.state.board[this.state.guess].length == 5) {
      this.state.guess += 1
      console.log("Pushing to board...")
      this.state.board.push("");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="mt-5">
            <Board board={this.state.board}></Board>
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
