import React, { Component } from "react";

import _ from "lodash"

class BoardRow extends Component {
  state = {};


  addColor() {

    let items = []

    _.times(5, (i) => {
      if (this.props.word.match[i] === "success") {
        items.push(<li key={i} className="btn-key list-group-item success">{this.props.word.guess[i]}</li>)
      } else if (this.props.word.match[i] === "partial") {
        items.push(<li key={i} className="btn-key list-group-item partial">{this.props.word.guess[i]}</li>)
      } else {
        items.push(<li key={i} className="btn-key list-group-item">{this.props.word.guess[i]}</li>)
      }
    })

    return items
  }

  render() {
    return (
      <ul className="list-group list-group-horizontal">
        {this.addColor()}
        {/* {this.props.word.guess.split("").map((char, index) => (
          <li key={index} className="btn-key list-group-item">{char}</li>
        ))} */}
      </ul>
    );
  }
}

export default BoardRow;
