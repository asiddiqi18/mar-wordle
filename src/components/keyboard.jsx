import React, { Component } from "react";
import Key from "./key";

class Keyboard extends Component {
  state = {};
  topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  bottomRow = ["back", "Z", "X", "C", "V", "B", "N", "M", "enter"];
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
