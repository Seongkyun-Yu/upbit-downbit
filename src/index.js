import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import createSagaMiddleware from "redux-saga";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, rootSaga } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./reset.css";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
