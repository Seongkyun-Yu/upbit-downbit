import { combineReducers } from "redux";
import { candleReducer } from "./candleReducer";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all();
}
