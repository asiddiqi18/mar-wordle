import React, { Component } from "react";
import Key from "./key";

class Keyboard extends Component {
  state = {};
  topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  bottomRow = ["back", "Z", "X", "C", "V", "B", "N", "M", "enter"];

  getStatus(char) {
    if (this.props.charStatus.successChars.includes(char)) {
      return 1;
    } else if (this.props.charStatus.partialChars.includes(char)) {
      return 2;
    } else if (this.props.charStatus.wrongChars.includes(char)) {
      return 3;
    } else {
      return 4;
    }
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <tbody className="d-flex flex-column align-items-center justify-content-center">
            <tr className="keyboard-row ">
              {this.topRow.map((char) => (
                <td className="align-middle">
                  <Key
                    key={char.id}
                    letter={char}
                    onKeyPress={this.props.onKeyPress}
                    onBackSpace={this.props.onBackSpace}
                    status={this.getStatus(char)}
                  >
                    {char}
                  </Key>
                </td>
              ))}
            </tr>
            <tr className="keyboard-row">
              {this.midRow.map((char) => (
                <td>
                  <Key
                    key={char.id}
                    letter={char}
                    onKeyPress={this.props.onKeyPress}
                    onBackSpace={this.props.onBackSpace}
                    status={this.getStatus(char)}
                  >
                    {char}
                  </Key>
                </td>
              ))}
            </tr>
            <tr className="keyboard-row">
              {this.bottomRow.map((char) => (
                <td>
                  <Key
                    key={char.id}
                    letter={char}
                    onKeyPress={this.props.onKeyPress}
                    onBackSpace={this.props.onBackSpace}
                    onEnter={this.props.onEnter}
                    status={this.getStatus(char)}
                  >
                    {char}
                  </Key>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Keyboard;
