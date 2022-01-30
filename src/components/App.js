import React, { Component } from "react";
import Board from "./board";
import Keyboard from "./keyboard";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      guess: 0,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(letter) {
    console.log("Key pressed!")
    console.log(letter)
    console.log(this.state.board)
    if (this.state.board.length == this.state.guess) {
      this.state.board.push("");
    }
    if (this.state.board[this.state.guess].length != 5) {
      this.state.board[this.state.guess] += letter;
      super.setState(this.state.board);
      console.log(this.state.board[this.state.guess]);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="mt-5">
            <Board board={this.state.board}></Board>
            <Keyboard onKeyPress={this.handleKeyPress}></Keyboard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
