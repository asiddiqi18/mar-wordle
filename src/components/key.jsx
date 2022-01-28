import React, { Component } from "react";


class Key extends Component {
  state = {};


  createKeyButton() {

    if (this.props.letter == "back") {
        return <button type="button" className="btn btn-danger btn-special btn-lg m-1">Back</button>
    } else if (this.props.letter == "enter") {
        return <button type="button" className="btn btn-success btn-special btn-lg m-1">Enter</button>
    } else {
        return <button type="button" className="btn btn-light btn-key btn-lg m-1">{this.props.letter}</button>
    }
  }

  render() {


    return <React.Fragment>
        {this.createKeyButton()}
    </React.Fragment>;
  }
}

export default Key;
