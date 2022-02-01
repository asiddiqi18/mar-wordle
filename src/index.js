import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App.js";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
