import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router } from "react-router-dom";

const output = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(output, document.getElementById("root"));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
