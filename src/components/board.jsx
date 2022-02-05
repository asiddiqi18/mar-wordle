import React, { Component } from "react";
import BoardRow from "./boardRow";

class Board extends Component {
  state = {};

  addPadding() {
    // console.log("addPadding: ");
    var paddedList = [];

    const { board, guessNumber } = this.props;

    for (let index = 0; index < guessNumber; index++) {
      paddedList.push({
        guess: board[index].guess,
        match: board[index].match,
      });
    }

    if (guessNumber == 5) {
      return paddedList;
    }

    let latestGuess = board[guessNumber].guess;
    let lengthOfLatestGuess = latestGuess.length;
    paddedList.push({
      guess: (latestGuess += " ".repeat(5 - lengthOfLatestGuess)),
      match: [],
    });

    for (let index = guessNumber + 1; index < 5; index++) {
      paddedList.push({ guess: " ".repeat(5), match: [] });
    }

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
