import { combineReducers } from "redux";
import { candleReducer } from "./candleReducer";

const rootReducer = combineReducers({
  candle: candleReducer,
});
