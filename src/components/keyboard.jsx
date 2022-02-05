import React, { Component } from "react";
import Key from "./key";

const Keyboard = (props) => {
  const { charStatus, onKeyPress, onBackSpace, onEnter } = props;
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["back", "Z", "X", "C", "V", "B", "N", "M", "enter"];
  const keyboardRows = [topRow, midRow, bottomRow];

  const getStatus = (char) => {
    if (charStatus.successChars.includes(char)) {
      return 1;
    } else if (charStatus.partialChars.includes(char)) {
      return 2;
    } else if (charStatus.wrongChars.includes(char)) {
      return 3;
    } else {
      return 4;
    }
  };

  return (
    <React.Fragment>
      <table>
        <tbody className="d-flex flex-column align-items-center justify-content-center">
          {keyboardRows.map((row) => (
            <tr className="keyboard-row ">
              {row.map((char) => (
                <td className="align-middle">
                  <Key
                    key={char.id}
                    letter={char}
                    onKeyPress={onKeyPress}
                    onBackSpace={onBackSpace}
                    status={getStatus(char)}
                  >
                    {char}
                  </Key>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Keyboard;
