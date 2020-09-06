import { combineReducers } from "redux";
import { candleReducer, candleSaga } from "./candleReducer";
import { loadingReducer } from "./loadingReducer";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  Candle: candleReducer,
  Loading: loadingReducer,
});

function* rootSaga() {
  yield all([candleSaga()]);
}

export { rootReducer, rootSaga };
