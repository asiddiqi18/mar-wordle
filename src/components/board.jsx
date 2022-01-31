import React, { Component } from "react";
import BoardRow from "./boardRow";

class Board extends Component {
  state = {};

  addPadding() {
    // console.log("addPadding: ");
    var paddedList = [];


    for (let index = 0; index < this.props.guessNumber; index++) {
      paddedList.push({guess: this.props.board[index].guess, match: this.props.board[index].match})
    }

    let latestGuess = this.props.board[this.props.guessNumber].guess
    let lengthOfLatestGuess = latestGuess.length
    paddedList.push({guess: latestGuess += " ".repeat(5 - lengthOfLatestGuess), match: []})

    for (let index = this.props.guessNumber + 1; index < 5; index++) {
      paddedList.push({guess: " ".repeat(5), match: []})
    }

    // console.log(paddedList)

    return paddedList;

  }

  render() {
    return (
      <React.Fragment>
        {this.addPadding().map((word, index) => (
          <BoardRow key={index} word={word}></BoardRow>
        ))}
      </React.Fragment>
    );
  }
}

export default Board;
