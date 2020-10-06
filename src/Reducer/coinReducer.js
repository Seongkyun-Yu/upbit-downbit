import {
  createRequestCandleSaga,
  createConnectSocketThunk,
  createChangeOptionSaga,
  candleActions,
  changeOptionActions,
} from "../Lib/asyncUtil";
import { candleDataUtils } from "../Lib/utils";
import { coinApi } from "../Api/api";
import { takeEvery, put, select } from "redux-saga/effects";

const START_INIT = "coin/START_INIT";
const START_CHANGE_MARKET_AND_DATA = "coin/START_CHANGE_MARKET_AND_DATA";

const GET_MARKET_NAMES = "coin/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "coin/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "coin/GET_MARKET_NAMES_ERROR";

const GET_INIT_CANDLES = "coin/GET_INIT_CANDLES";
const GET_INIT_CANDLES_SUCCESS = "coin/GET_INIT_CANDLES_SUCCESS";
const GET_INIT_CANDLES_ERROR = "coin/GET_INIT_CANDLES_ERROR";

const GET_ONE_COIN_CANDLES = "coin/GET_ONE_COIN_CANDLES";
const GET_ONE_COIN_CANDLES_SUCCESS = "coin/GET_ONE_COIN_CANDLES_SUCCESS";
const GET_ONE_COIN_CANDLES_ERROR = "coin/GET_ONE_COIN_CANDLES_ERROR";

const CONNECT_CANDLE_SOCKET = "coin/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "coin/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "coin/CONNECT_CANDLE_SOCKET_ERROR";

const CHANGE_COIN_MARKET = "coin/CHANGE_COIN_MARKET";
const CHANGE_COIN_MARKET_SUCCESS = "coin/CHANGE_COIN_MARKET_SUCCESS";

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

// 특정 코인 봉 200개 가져오기 Saga
const getOneCoinCandles = () => ({ type: GET_ONE_COIN_CANDLES });
const getOneCoinCandlesSaga = createRequestCandleSaga(
  GET_ONE_COIN_CANDLES,
  coinApi.getOneCoinCandles,
  candleDataUtils.oneCoin
);

// 코인마켓 변경하기 Saga
const changeSelectedMarket = (marketName) => ({
  type: CHANGE_COIN_MARKET,
  payload: marketName,
});
const changeSelectedMarketSaga = createChangeOptionSaga(CHANGE_COIN_MARKET);

// 캔들 웹소켓 연결 Thunk
const connectCandleSocketThunk = createConnectSocketThunk(
  CONNECT_CANDLE_SOCKET,
  "ticker",
  candleDataUtils.update
);

// 시작시 데이터 초기화 작업들
const startInit = () => ({ type: START_INIT });
function* startInittSaga() {
  yield getMarketNameSaga(); // 코인/시장 종류 받기

  const state = yield select();
  const marketNames = Object.keys(state.Coin.marketNames.data);
  const selectedMarket = state.Coin.selectedMarket;
  const selectedTimeType = state.Coin.selectedTimeType;
  const selectedTimeCount = state.Coin.selectedTimeCount;

  yield getInitCandleSaga({ payload: marketNames }); // 코인 캔들 초기값 받기
  yield getOneCoinCandlesSaga({
    payload: {
      coin: selectedMarket,
      timeType: selectedTimeType,
      timeCount: selectedTimeCount,
    },
  });
  yield put(connectCandleSocketThunk({ payload: marketNames })); // 캔들 소켓 연결
}

// 선택된 코인/마켓 변경
const startChangeMarketAndData = (marketName) => ({
  type: START_CHANGE_MARKET_AND_DATA,
  payload: marketName,
});
function* startChangeMarketAndDataSaga(action) {
  console.log("들어왔어!", action.payload);
  const state = yield select();
  const changingMarketName = action.payload;
  yield put(changeSelectedMarket(changingMarketName));
}

function* coinSaga() {
  yield takeEvery(GET_MARKET_NAMES, getMarketNameSaga);
  yield takeEvery(GET_INIT_CANDLES, getInitCandleSaga);
  yield takeEvery(GET_ONE_COIN_CANDLES, getOneCoinCandlesSaga);
  yield takeEvery(CHANGE_COIN_MARKET, changeSelectedMarketSaga);
  yield takeEvery(START_INIT, startInittSaga);
  yield takeEvery(START_CHANGE_MARKET_AND_DATA, startChangeMarketAndDataSaga);
}

const initialState = {
  marketNames: {
    error: null,
    data: {
      "KRW-BTC": "비트코인",
    },
  },
  selectedMarket: "KRW-BTC",
  selectedTimeType: "minutes",
  selectedTimeCount: 5,
  candle: {
    error: null,
    data: {
      "KRW-BTC": {
        candles: [
          // { date: new Date(), open: 1, close: 1, high: 1, low: 1, volume: 1 },
        ],
        accTradePrice: 0,
        accTradeVolume: 0,
        changeRate: 0,
      },
    },
  },
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARKET_NAMES_SUCCESS:
    case GET_MARKET_NAMES_ERROR:
      return candleActions(GET_MARKET_NAMES, "marketNames")(state, action);
    case GET_INIT_CANDLES_SUCCESS:
    case GET_INIT_CANDLES_ERROR:
      return candleActions(GET_INIT_CANDLES, "candle")(state, action);
    case GET_ONE_COIN_CANDLES_SUCCESS:
    case GET_ONE_COIN_CANDLES_ERROR:
      return candleActions(GET_ONE_COIN_CANDLES, "candle")(state, action);
    case CONNECT_CANDLE_SOCKET_SUCCESS:
    case CONNECT_CANDLE_SOCKET_ERROR:
      return candleActions(CONNECT_CANDLE_SOCKET, "candle")(state, action);
    case CHANGE_COIN_MARKET_SUCCESS:
      return changeOptionActions(CHANGE_COIN_MARKET, "selectedMarket")(
        state,
        action
      );
    default:
      return state;
  }
};

export {
  startInit,
  getMakretNames,
  getInitCanldes,
  getOneCoinCandles,
  startChangeMarketAndData,
  coinReducer,
  coinSaga,
};
