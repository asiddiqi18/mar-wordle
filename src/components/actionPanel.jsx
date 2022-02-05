import React, { useEffect, useCallback } from "react";

const ActionPanel = (props) => {
  const { onKeyPress, onBackSpace, onEnter } = props;


  const keyFunction = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onBackSpace();
    } else if (/[a-zA-Z]/.test(event.key)) {
      onKeyPress(event.key.toUpperCase());
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyFunction);

    return () => {
      document.removeEventListener("keydown", keyFunction);
    };
  }, []);

  return <input style={{ display: "none" }} />;
};

export default ActionPanel;
