import React, { Component } from "react";

import _ from "lodash";

class BoardRow extends Component {
  state = {};

  addColor() {
    let items = [];

    _.times(5, (i) => {
      switch (this.props.word.match[i]) {
        case "success":
          items.push(
            <li key={i} className="btn-key list-group-item success">
              {this.props.word.guess[i]}
            </li>
          );
          break;
        case "partial":
          items.push(
            <li key={i} className="btn-key list-group-item partial">
              {this.props.word.guess[i]}
            </li>
          );

          break;
        case "wrong":
          items.push(
            <li key={i} className="btn-key list-group-item fail">
              {this.props.word.guess[i]}
            </li>
          );

          break;
        default:
          items.push(
            <li key={i} className="btn-key list-group-item">
              {this.props.word.guess[i]}
            </li>
          );

          break;
      }
    });

    return items;
  }

  render() {
    return (
      <ul className="list-group list-group-horizontal justify-content-center">
        {this.addColor()}
        {/* {this.props.word.guess.split("").map((char, index) => (
          <li key={index} className="btn-key list-group-item">{char}</li>
        ))} */}
      </ul>
    );
  }
}

export default BoardRow;
