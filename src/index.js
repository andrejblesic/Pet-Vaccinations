import React from "react";
import ReactDOM from "react-dom";
import Container from "./reactredux.js";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
