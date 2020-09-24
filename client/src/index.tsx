import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Application from "./app/App";
import store from "./app/redux/store/index";

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);
