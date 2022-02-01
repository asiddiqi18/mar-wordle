import React, { useEffect, useRef } from "react";
const ESCAPE_KEYS = ["27", "Escape"];

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default function App() {
  const handler = ({ key }) => {
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log("Escape key pressed!");
    }
  };

  useEventListener("keydown", handler);

  return <span>hello world</span>;
}