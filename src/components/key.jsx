import React, { Component } from "react";

class Key extends Component {
  state = {};

  createKeyButton() {
    if (this.props.letter === "back") {
      return (
        <button
          onClick={() => this.props.onBackSpace()}
          type="button"
          className="me-1 btn btn-danger btn-special btn"
        >
          Back
        </button>
      );
    } else if (this.props.letter === "enter") {
      return (
        <button
          onClick={() => this.props.onEnter()}
          type="button"
          className="ms-1 btn btn-success btn-special btn"
        >
          Enter
        </button>
      );
    }

    var classStatus = ""
    switch(this.props.status) {
      case 1:
        classStatus += "success"
        break;
      case 2:
        classStatus += "partial"
        break;
      case 3:
        classStatus += "wrong"
        break;                  
  }

    return (
      <button
        onClick={() => this.props.onKeyPress(this.props.letter)}
        type="button"
        className={"btn btn-light btn-key " + classStatus}
      >
        {this.props.letter}
      </button>
    );

  }

  render() {
    return <React.Fragment>{this.createKeyButton()}</React.Fragment>;
  }
}

export default Key;
