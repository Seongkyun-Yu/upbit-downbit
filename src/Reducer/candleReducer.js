import {
  candleDataUtils,
  candleActions,
  createRequestCandleSaga,
} from "../Lib/asyncUtil";
import { coinApi } from "../Api/api";
import { takeEvery, put } from "redux-saga/effects";

const START_INIT = "candle/START_INIT";

const GET_MARKET_NAMES = "candle/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "candle/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "candle/GET_MARKET_NAMES_ERROR";

const CONNECT_CANDLE_SOCKET = "candle/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "candle/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "candle/CONNECT_CANDLE_SOCKET_ERROR";

const GET_INIT_CANDLES = "candle/GET_INIT_CANDLES";
const GET_INIT_CANDLES_SUCCESS = "candle/GET_INIT_CANDLES_SUCCESS";
const GET_INIT_CANDLES_ERROR = "candle/GET_INIT_CANDLES_ERROR";

const getMakretNames = () => ({ type: GET_MARKET_NAMES });
const getMarketNameSaga = createRequestCandleSaga(
  GET_MARKET_NAMES,
  coinApi.getMarketCodes,
  candleDataUtils.marketNames
);

const getInitCanldes = () => ({ type: GET_INIT_CANDLES });
const getInitCandleSaga = createRequestCandleSaga(
  GET_INIT_CANDLES,
  coinApi.getInitCanldes,
  candleDataUtils.init
);

const startInit = () => ({ type: START_INIT });
function* startInittSaga() {
  yield put(getMakretNames());
  yield put(getInitCanldes());
}

function* candleSaga() {
  yield takeEvery(GET_MARKET_NAMES, getMarketNameSaga);
  yield takeEvery(GET_INIT_CANDLES, getInitCandleSaga);
  yield takeEvery(START_INIT, startInittSaga);
}

const initialState = {
  marketName: {
    error: null,
    data: {
      "KRW-BTC": "비트코인",
    },
  },
  candle: {
    error: null,
    data: {
      "KRW-BTC": {
        candles: [],
        accTradePrice: 0,
        accTradeVolume: 0,
        changeRate: 0,
      },
    },
  },
};

const candleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARKET_NAMES_SUCCESS:
    case GET_MARKET_NAMES_ERROR:
      return candleActions(GET_MARKET_NAMES, "marketName")(state, action);
    case GET_INIT_CANDLES_SUCCESS:
    case GET_INIT_CANDLES_ERROR:
      return candleActions(GET_INIT_CANDLES, "candle")(state, action);
    default:
      return state;
  }
};

export { startInit, getMakretNames, getInitCanldes, candleReducer, candleSaga };
