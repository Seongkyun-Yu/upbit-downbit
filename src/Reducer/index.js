import { combineReducers } from "redux";
import { candleReducer } from "./candleReducer";
import { loadingReducer } from "./loadingReducer";

const rootReducer = combineReducers({
  Candle: candleReducer,
  Loading: loadingReducer,
});

export { rootReducer };
