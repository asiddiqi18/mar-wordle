import React, { Component } from "react";

class BoardRow extends Component {
  state = {};

  render() {
    return (
      <ul className="list-group list-group-horizontal">
        {this.props.word.split("").map((char, index) => (
          <li key={index} className="btn-key list-group-item">{char}</li>
        ))}
      </ul>
    );
  }
}

export default BoardRow;
