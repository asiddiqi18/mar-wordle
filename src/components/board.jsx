import React, { Component } from "react";
import _ from "lodash";
import BoardRow from "./boardRow";

class Board extends Component {
  state = {};

  addPadding(wordsList) {
    console.log("addPadding: ");
    console.log(wordsList);
    var paddedList = _.cloneDeep(wordsList);
    if (paddedList.length > 0) {
      console.log("(A)");
      var lengthOfLastWord = paddedList[paddedList.length - 1].length;
      if (lengthOfLastWord < 5) {
        console.log("(B)");
        paddedList[paddedList.length - 1] += " ".repeat(5 - lengthOfLastWord);
      }
    }
    while (paddedList.length < 5) {
      paddedList.push(" ".repeat(5));
    }
    console.log(paddedList);
    return paddedList;
  }

  render() {
    return (
      <React.Fragment>
        {this.addPadding(this.props.board).map((word, index) => (
          <BoardRow key={index} word={word}></BoardRow>
        ))}
      </React.Fragment>
    );
  }
}

export default Board;
