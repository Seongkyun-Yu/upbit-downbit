import { combineReducers } from "redux";
import { coinReducer, coinSaga } from "./coinReducer";
import { loadingReducer } from "./loadingReducer";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  Coin: coinReducer,
  Loading: loadingReducer,
});

function* rootSaga() {
  yield all([coinSaga()]);
}

export { rootReducer, rootSaga };
