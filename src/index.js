import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import createSagaMiddleware from "redux-saga";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, rootSaga } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
// import "./reset.css";
import styled from "styled-components";

import { Normalize } from "styled-normalize";
import { Reset } from "styled-reset";

const DefaultContainer = styled.div`
  background-color: rgb(231, 234, 239);
`;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Normalize />
        <Reset />
        <DefaultContainer>
          <App />
        </DefaultContainer>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
