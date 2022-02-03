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
            <div key={i} className="tile tile-style shadow success">
              {this.props.word.guess[i]}
            </div>
          );
          break;
        case "partial":
          items.push(
            <div key={i} className="tile tile-style shadow partial">
              {this.props.word.guess[i]}
            </div>
          );

          break;
        case "wrong":
          items.push(
            <div key={i} className="tile tile-style shadow wrong">
              {this.props.word.guess[i]}
            </div>
          );

          break;
        default:
          items.push(
            <div key={i} className="tile tile-style">
              {this.props.word.guess[i]}
            </div>
          );

          break;
      }
    });

    return items;
  }

  render() {
    return (
      <div className="grid-container">
        {this.addColor()}
      </div>
    );
  }
}

export default BoardRow;
