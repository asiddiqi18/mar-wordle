import React, { Component } from "react";

import _ from "lodash";

const BoardRow = (props) => {
  const { word } = props;

  const addColor = () => {
    let items = [];

    _.times(5, (i) => {
      switch (word.match[i]) {
        case "success":
          items.push(
            <div key={i} className="tile tile-style shadow success">
              {word.guess[i]}
            </div>
          );
          break;
        case "partial":
          items.push(
            <div key={i} className="tile tile-style shadow partial">
              {word.guess[i]}
            </div>
          );

          break;
        case "wrong":
          items.push(
            <div key={i} className="tile tile-style shadow wrong">
              {word.guess[i]}
            </div>
          );

          break;
        default:
          items.push(
            <div key={i} className="tile tile-style">
              {word.guess[i]}
            </div>
          );

          break;
      }
    });

    return items;
  };

  return <div className="grid-container">{addColor()}</div>;
};

export default BoardRow;
