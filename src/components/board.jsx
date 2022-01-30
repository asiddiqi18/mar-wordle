import React, { Component } from "react";
import _ from "lodash";
import BoardRow from "./boardRow";

class Board extends Component {
  state = {};

  addPadding() {
    console.log("addPadding: ");
    var paddedList = [];


    for (let index = 0; index < this.props.guessNumber; index++) {
      paddedList.push(this.props.board[index].guess)
    }

    let latestGuess = this.props.board[this.props.guessNumber].guess
    let lengthOfLatestGuess = latestGuess.length
    paddedList.push(latestGuess += " ".repeat(5 - lengthOfLatestGuess))

    for (let index = this.props.guessNumber + 1; index < 5; index++) {
      paddedList.push(" ".repeat(5))
    }

    console.log(paddedList)

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
