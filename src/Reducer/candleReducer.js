import {
  candleDataUtils,
  candleActions,
  createRequestCandleSaga,
  createConnectSocketThunk,
} from "../Lib/asyncUtil";
import { coinApi } from "../Api/api";
import { takeEvery, put } from "redux-saga/effects";

const START_INIT = "candle/START_INIT";

const GET_MARKET_NAMES = "candle/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "candle/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "candle/GET_MARKET_NAMES_ERROR";

const GET_INIT_CANDLES = "candle/GET_INIT_CANDLES";
const GET_INIT_CANDLES_SUCCESS = "candle/GET_INIT_CANDLES_SUCCESS";
const GET_INIT_CANDLES_ERROR = "candle/GET_INIT_CANDLES_ERROR";

const CONNECT_CANDLE_SOCKET = "candle/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "candle/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "candle/CONNECT_CANDLE_SOCKET_ERROR";

// 업비트에서 제공하는 코인/마켓 이름들 가져오기 Saga
const getMakretNames = () => ({ type: GET_MARKET_NAMES });
const getMarketNameSaga = createRequestCandleSaga(
  GET_MARKET_NAMES,
  coinApi.getMarketCodes,
  candleDataUtils.marketNames
);

// 업비트에서 제공하는 코인/마켓 캔들들의 일봉 한 개씩 가져오기 Saga
const getInitCanldes = () => ({ type: GET_INIT_CANDLES });
const getInitCandleSaga = createRequestCandleSaga(
  GET_INIT_CANDLES,
  coinApi.getInitCanldes,
  candleDataUtils.init
);

// 캔들 웹소켓 연결 Thunk
const connectCandleSocketThunk = createConnectSocketThunk(
  CONNECT_CANDLE_SOCKET,
  "ticker",
  candleDataUtils.update
);

// 시작시 데이터 초기화 작업들
const startInit = () => ({ type: START_INIT });
function* startInittSaga() {
  let marketNames = yield getMarketNameSaga(); // 코인/시장 종류 받기
  marketNames = Object.keys(marketNames);

  yield getInitCandleSaga({ payload: marketNames }); // 코인 캔들 초기값 받기
  yield put(connectCandleSocketThunk({ payload: marketNames })); // 캔들 소켓 연결
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
