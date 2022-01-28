import React, { Component } from "react";
import Board from "./board";
import Keyboard from "./keyboard";

class App extends Component {
  state = {
      board: [],
      guess: 0
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
            <div className="mt-5">
                <Board></Board>
                <Keyboard></Keyboard>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
