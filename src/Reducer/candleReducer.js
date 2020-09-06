import {
  candleDataUtils,
  candleActions,
  createRequestCandleSaga,
} from "../Lib/asyncUtil";
import { coinApi } from "../Api/api";
import { takeEvery, takeLatest } from "redux-saga/effects";

const GET_MARKET_NAMES = "candle/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "candle/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "candle/GET_MARKET_NAMES_ERROR";

const CONNECT_CANDLE_SOCKET = "candle/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "candle/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "candle/CONNECT_CANDLE_SOCKET_ERROR";

const GET_ALL_CANDLE = "candle/GET_ALL_CANDLE";
const GET_ALL_CANDLE_SUCCESS = "candle/GET_ALL_CANDLE_SUCCESS";
const GET_ALL_CANDLE_ERROR = "candle/GET_ALL_CANDLE_ERROR";

// Saga 진입용 액션들
const getMakretNames = () => ({ type: GET_MARKET_NAMES });

const getMarketNameSaga = createRequestCandleSaga(
  GET_MARKET_NAMES,
  coinApi.getMarketCodes,
  candleDataUtils.marketNames
);

function* candleSaga() {
  yield takeLatest(GET_MARKET_NAMES, getMarketNameSaga);
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
      return candleActions(GET_MARKET_NAMES);
    default:
      return state;
  }
};

export { getMakretNames, candleReducer, candleSaga };
