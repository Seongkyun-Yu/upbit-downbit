import {
  createRequestSaga,
  createConnectSocketThunk,
  createChangeOptionSaga,
  requestActions,
  changeOptionActions,
  requestInitActions,
  createConnectSocketSaga,
} from "../Lib/asyncUtil";
import { candleDataUtils, orderbookUtils, tradeListUtils } from "../Lib/utils";
import { coinApi } from "../Api/api";
import { takeEvery, put, select } from "redux-saga/effects";
import moment from "moment-timezone";

const START_INIT = "coin/START_INIT";
const START_CHANGE_MARKET_AND_DATA = "coin/START_CHANGE_MARKET_AND_DATA";
const CHANGE_TIME_TYPE_AND_DATA = "coin/CHANGE_TIME_TYPE_AND_DATA";
const START_ADD_MORE_CANDLE_DATA = "coin/START_ADD_MORE_CANDLE_DATA";

const GET_MARKET_NAMES = "coin/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "coin/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "coin/GET_MARKET_NAMES_ERROR";

const GET_INIT_CANDLES = "coin/GET_INIT_CANDLES";
const GET_INIT_CANDLES_SUCCESS = "coin/GET_INIT_CANDLES_SUCCESS";
const GET_INIT_CANDLES_ERROR = "coin/GET_INIT_CANDLES_ERROR";

const GET_ONE_COIN_CANDLES = "coin/GET_ONE_COIN_CANDLES";
const GET_ONE_COIN_CANDLES_SUCCESS = "coin/GET_ONE_COIN_CANDLES_SUCCESS";
const GET_ONE_COIN_CANDLES_ERROR = "coin/GET_ONE_COIN_CANDLES_ERROR";

const GET_ADDITIONAL_COIN_CANDLES = "coin/GET_ADDITIONAL_COIN_CANDLES";
const GET_ADDITIONAL_COIN_CANDLES_SUCCESS =
  "coin/GET_ADDITIONAL_COIN_CANDLES_SUCCESS";
const GET_ADDITIONAL_COIN_CANDLES_ERROR =
  "coin/GET_ADDITIONAL_COIN_CANDLES_ERROR";

const CONNECT_CANDLE_SOCKET = "coin/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "coin/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "coin/CONNECT_CANDLE_SOCKET_ERROR";

const GET_ONE_COIN_TRADELISTS = "coin/GET_ONE_COIN_TRADELISTS";
const GET_ONE_COIN_TRADELISTS_SUCCESS = "coin/GET_ONE_COIN_TRADELISTS_SUCCESS";
const GET_ONE_COIN_TRADELISTS_ERROR = "coin/GET_ONE_COIN_TRADELISTS_ERROR";

const CONNECT_TRADELIST_SOCKET = "coin/CONNECT_TRADELIST_SOCKET";
const CONNECT_TRADELIST_SOCKET_SUCCESS =
  "coin/CONNECT_TRADELIST_SOCKET_SUCCESS";
const CONNECT_TRADELIST_SOCKET_ERROR = "coin/CONNECT_TRADELIST_SOCKET_ERROR";

const GET_INIT_ORDERBOOKS = "coin/GET_INIT_ORDERBOOKS";
const GET_INIT_ORDERBOOKS_SUCCESS = "coin/GET_INIT_ORDERBOOKS_SUCCESS";
const GET_INIT_ORDERBOOKS_ERROR = "coin/GET_INIT_ORDERBOOKS_ERROR";

const CONNECT_ORDERBOOK_SOCKET = "coin/CONNECT_ORDERBOOK_SOCKET";
const CONNECT_ORDERBOOK_SOCKET_SUCCESS =
  "coin/CONNECT_ORDERBOOK_SOCKET_SUCCESS";
const CONNECT_ORDERBOOK_SOCKET_ERROR = "coin/CONNECT_ORDERBOOK_SOCKET_ERROR";

const CHANGE_COIN_MARKET = "coin/CHANGE_COIN_MARKET";
const CHANGE_COIN_MARKET_SUCCESS = "coin/CHANGE_COIN_MARKET_SUCCESS";

const CHANGE_TIME_TYPE = "coin/CHANGE_TIME_TYPE";
const CHANGE_TIME_TYPE_SUCCESS = "coin/CHANGE_TIME_TYPE_SUCCESS";

const CHANGE_TIME_COUNT = "coin/CHANGE_TIME_COUNT";
const CHANGE_TIME_COUNT_SUCCESS = "coin/CHANGE_TIME_COUNT_SUCCESS";

const CHANGE_ASK_BID_ORDER = "coin/CHANGE_ASK_BID_ORDER";
const CHANGE_ASK_BID_ORDER_SUCCESS = "coin/CHANGE_ASK_BID_ORDER_SUCCESS";

const CHANGE_ORDER_PRICE = "coin/CHANGE_ORDER_PRICE";
const CHANGE_ORDER_PRICE_SUCCESS = "coin/CHANGE_ORDER_PRICE_SUCCESS";

const CHANGE_ORDER_AMOUNT = "coin/CHANGE_ORDER_AMOUNT";
const CHANGE_ORDER_AMOUNT_SUCCESS = "coin/CHANGE_ORDER_AMOUNT_SUCCESS";

const CHANGE_ORDER_TOTAL_PRICE = "coin/CHANGE_ORDER_TOTAL_PRICE";
const CHANGE_ORDER_TOTAL_PRICE_SUCCESS =
  "coin/CHANGE_ORDER_TOTAL_PRICE_SUCCESS";

const CHANGE_PRICE_AND_TOTAL_PRICE = "coin/CHANGE_PRICE_AND_TOTAL_PRICE";
const CHANGE_AMOUNT_AND_TOTAL_PRICE = "coin/CHANGE_AMOUNT_AND_TOTAL_PRICE";
const CHANGE_TOTAL_PRICE_AND_AMOUNT = "coin/CHANGE_TOTAL_PRICE_AND_AMOUNT";

const SEARCH_COIN = "coin/SEARCH_COIN";
const SEARCH_COIN_SUCCESS = "coin/SEARCH_COIN_SUCCESS";

// 업비트에서 제공하는 코인/마켓 이름들 가져오기 Saga
const getMarketNameSaga = createRequestSaga(
  GET_MARKET_NAMES,
  coinApi.getMarketCodes,
  candleDataUtils.marketNames
);

// 코인/마켓 캔들들의 일봉 한 개씩 가져오기 Saga
const getInitCandleSaga = createRequestSaga(
  GET_INIT_CANDLES,
  coinApi.getInitCanldes,
  candleDataUtils.init
);

// 특정 코인 봉 200개 가져오기 Saga
const getOneCoinCandlesSaga = createRequestSaga(
  GET_ONE_COIN_CANDLES,
  coinApi.getOneCoinCandles,
  candleDataUtils.oneCoin
);

const getAdditionalCoinCandlesSaga = createRequestSaga(
  GET_ADDITIONAL_COIN_CANDLES,
  coinApi.getAdditionalCoinCandles,
  candleDataUtils.add
);

// 캔들 웹소켓 연결 Thunk
const connectCandleSocketThunk = createConnectSocketThunk(
  CONNECT_CANDLE_SOCKET,
  "ticker",
  candleDataUtils.update
);

// const connectCandleSocketThunk = createConnectSocketThrottleThunk(
//   CONNECT_CANDLE_SOCKET,
//   "ticker",
//   candleDataUtils.update
// );

const connectCandleSocketSaga = createConnectSocketSaga(
  CONNECT_CANDLE_SOCKET,
  "ticker",
  candleDataUtils.updates
);

// 호가창 조기 값 가져오기
const getInitOrderbookSaga = createRequestSaga(
  GET_INIT_ORDERBOOKS,
  coinApi.getInitOrderbooks,
  orderbookUtils.init
);

// 호가창 웹소켓 연결 Thunk
const connectOrderbookSocketThunk = createConnectSocketThunk(
  CONNECT_ORDERBOOK_SOCKET,
  "orderbook",
  orderbookUtils.update
);

// 체결내역 200개 가져오기
const getOneCoinTradeListsSaga = createRequestSaga(
  GET_ONE_COIN_TRADELISTS,
  coinApi.getOneCoinTradeLists,
  tradeListUtils.init
);

// 체결내역 웹소켓 연결 Thunk
const connectTradeListSocketThunk = createConnectSocketThunk(
  CONNECT_TRADELIST_SOCKET,
  "trade",
  tradeListUtils.update
);

// 선택한 코인마켓 변경하기 Saga
const changeSelectedMarket = (marketName) => ({
  type: CHANGE_COIN_MARKET,
  payload: marketName,
});
const changeSelectedMarketSaga = createChangeOptionSaga(CHANGE_COIN_MARKET);

// 선택한 타임 타입(5분봉 할때 '분') 변경하기 Saga
const changeSelectedTimeTypeSaga = createChangeOptionSaga(CHANGE_TIME_TYPE);

// 선택한 타임 카운트(5분봉 할때 '5') 변경하기 Saga
const changeSelectedTimeCountSaga = createChangeOptionSaga(CHANGE_TIME_COUNT);

// 매수 매도 옵션 변경하기
const changeAskBidOrder = (askBidOption) => ({
  type: CHANGE_ASK_BID_ORDER,
  payload: askBidOption,
});
const changeAskBidOrderSaga = createChangeOptionSaga(CHANGE_ASK_BID_ORDER);

// 주문 가격 변경하기
const changeOrderPriceSaga = createChangeOptionSaga(CHANGE_ORDER_PRICE);

// 주문 수량 변경하기
const changeOrderAmountSaga = createChangeOptionSaga(CHANGE_ORDER_AMOUNT);

// 주문 총액 변경하기
const changeOrderTotalPriceSaga = createChangeOptionSaga(
  CHANGE_ORDER_TOTAL_PRICE
);

// 코인 검색 내용 변경하기 Saga
const searchCoin = (searchName) => ({
  type: SEARCH_COIN,
  payload: searchName,
});
const searchCoinSaga = createChangeOptionSaga(SEARCH_COIN);

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
  yield getInitOrderbookSaga({ payload: selectedMarket }); // 호가창 초기값 받기
  yield getOneCoinTradeListsSaga({ payload: selectedMarket }); // 체결내역 초기값 받기
  yield getOneCoinCandlesSaga({
    payload: {
      coin: selectedMarket,
      timeType: selectedTimeType,
      timeCount: selectedTimeCount,
    },
  }); // 200개 코인 데이터 받기

  // yield connectCandleSocketSaga({ payload: marketNames }); // 캔들 소켓 연결 사가버전
  yield put(connectOrderbookSocketThunk({ payload: marketNames })); // 오더북 소켓 연결
  yield put(connectTradeListSocketThunk({ payload: marketNames })); // 체결내역 소켓 연결
  // yield put(connectCandleSocketThunk({ payload: marketNames })); // 캔들 소켓 연결
  yield connectCandleSocketSaga({ payload: marketNames }); // 캔들 소켓 연결 사가버전
}

// 선택된 코인/마켓 변경 및 해당 마켓 데이터 받기
const startChangeMarketAndData = (marketName) => ({
  type: START_CHANGE_MARKET_AND_DATA,
  payload: marketName,
});
function* startChangeMarketAndDataSaga(action) {
  const state = yield select();
  const selectedTimeType = state.Coin.selectedTimeType;
  const selectedTimeCount = state.Coin.selectedTimeCount;
  const changingMarketName = action.payload;
  const selectedCoinCandles =
    state.Coin.candle.data[changingMarketName].candles;

  yield put(changeSelectedMarket(changingMarketName)); // 선택된 마켓 변경
  yield getInitOrderbookSaga({ payload: changingMarketName }); // 호가창 초기값 받기
  yield getOneCoinTradeListsSaga({ payload: changingMarketName }); // 체결내역 초기값 받기

  // 상태에 저장된 데이터가 200개 미만일때만 api콜 요청함
  if (selectedCoinCandles.length < 200) {
    yield getOneCoinCandlesSaga({
      payload: {
        coin: changingMarketName,
        timeType: selectedTimeType,
        timeCount: selectedTimeCount,
      },
    });
  }
}

// 추가 캔들 데이터 가져오기
const startAddMoreCandleData = () => ({ type: START_ADD_MORE_CANDLE_DATA });
function* startAddMoreCandleDataSaga() {
  const state = yield select();

  const selectedMarket = state.Coin.selectedMarket;
  const selectedTimeType = state.Coin.selectedTimeType;
  const selectedTimeCount = state.Coin.selectedTimeCount;

  const isLoading = state.Loading[GET_ADDITIONAL_COIN_CANDLES];

  if (isLoading) return;
  const datetime =
    moment(state.Coin.candle.data[selectedMarket].candles[0].date)
      .utc()
      .format("YYYY-MM-DDTHH:mm") + ":00Z";

  yield getAdditionalCoinCandlesSaga({
    payload: {
      coin: selectedMarket,
      timeType: selectedTimeType,
      timeCount: selectedTimeCount,
      datetime,
    },
  });
}

// 차트 시간 데이터 변경하고 데이터 받기
const changeTimeTypeAndData = (timeTypeAndCount) => ({
  type: CHANGE_TIME_TYPE_AND_DATA,
  payload: timeTypeAndCount,
});

function* changeTimeTypeAndDataSaga(action) {
  const state = yield select();
  const selectedMarket = state.Coin.selectedMarket;
  const selectedTimeType = state.Coin.selectedTimeType;
  const selectedTimeCount = state.Coin.selectedTimeCount;

  const newTimeType = action.payload.timeType;
  const newTimeCount = action.payload.timeCount;

  if (selectedTimeType === newTimeType && selectedTimeCount === newTimeCount)
    return;

  yield changeSelectedTimeTypeSaga({ payload: newTimeType });
  yield changeSelectedTimeCountSaga({ payload: newTimeCount });

  yield getOneCoinCandlesSaga({
    payload: {
      coin: selectedMarket,
      timeType: newTimeType,
      timeCount: newTimeCount,
    },
  });
}

// 가격 변경 후 주문 총액 바꾸기
const changePriceAndTotalPrice = (price) => ({
  type: CHANGE_PRICE_AND_TOTAL_PRICE,
  payload: price,
});
function* changePriceAndTotalPriceSaga(action) {
  const state = yield select();
  const orderAmount = state.Coin.orderAmount;

  yield changeOrderPriceSaga({ payload: action.payload });
  yield changeOrderTotalPriceSaga({
    payload: Math.ceil(action.payload * orderAmount),
  });
}

// 주문수량 변경 후 주문 총액 바꾸기
const changeAmountAndTotalPrice = (amount) => ({
  type: CHANGE_AMOUNT_AND_TOTAL_PRICE,
  payload: amount,
});
function* changeAmountAndTotalPriceSaga(action) {
  const state = yield select();
  const orderPrice = state.Coin.orderPrice;

  yield changeOrderAmountSaga({ payload: action.payload });
  yield changeOrderTotalPriceSaga({
    payload: Math.ceil(action.payload * orderPrice),
  });
}

// 주문총액 변경 후 주문수량 바꾸기
const changeTotalPriceAndAmount = (totalPrice) => ({
  type: CHANGE_TOTAL_PRICE_AND_AMOUNT,
  payload: totalPrice,
});
function* changeTotalPriceAndAmountSaga(action) {
  const state = yield select();
  const orderPrice = state.Coin.orderPrice;

  yield changeOrderTotalPriceSaga({ payload: action.payload });
  yield changeOrderAmountSaga({
    payload: orderPrice ? (action.payload / orderPrice).toFixed(8) : 0,
  });
}

function* coinSaga() {
  yield takeEvery(GET_MARKET_NAMES, getMarketNameSaga);
  yield takeEvery(GET_INIT_CANDLES, getInitCandleSaga);
  yield takeEvery(GET_INIT_ORDERBOOKS, getInitOrderbookSaga);
  yield takeEvery(GET_ONE_COIN_CANDLES, getOneCoinCandlesSaga);
  yield takeEvery(GET_ONE_COIN_TRADELISTS, getOneCoinTradeListsSaga);

  yield takeEvery(CHANGE_COIN_MARKET, changeSelectedMarketSaga);
  yield takeEvery(CHANGE_ASK_BID_ORDER, changeAskBidOrderSaga);
  yield takeEvery(CHANGE_ORDER_PRICE, changeOrderPriceSaga);
  yield takeEvery(CHANGE_ORDER_AMOUNT, changeOrderAmountSaga);
  yield takeEvery(CHANGE_ORDER_TOTAL_PRICE, changeOrderTotalPriceSaga);
  yield takeEvery(SEARCH_COIN, searchCoinSaga);

  yield takeEvery(START_INIT, startInittSaga);
  yield takeEvery(START_CHANGE_MARKET_AND_DATA, startChangeMarketAndDataSaga);
  yield takeEvery(START_ADD_MORE_CANDLE_DATA, startAddMoreCandleDataSaga);
  yield takeEvery(CHANGE_TIME_TYPE_AND_DATA, changeTimeTypeAndDataSaga);

  yield takeEvery(CHANGE_PRICE_AND_TOTAL_PRICE, changePriceAndTotalPriceSaga);
  yield takeEvery(CHANGE_AMOUNT_AND_TOTAL_PRICE, changeAmountAndTotalPriceSaga);
  yield takeEvery(CHANGE_TOTAL_PRICE_AND_AMOUNT, changeTotalPriceAndAmountSaga);
}

const initialState = {
  selectedMarket: "KRW-BTC",
  selectedTimeType: "minutes",
  selectedTimeCount: 5,
  selectedAskBidOrder: "bid",
  orderPrice: 0,
  orderAmount: 0,
  orderTotalPrice: 0,
  searchCoin: "",
  marketNames: {
    error: false,
    data: {
      "KRW-BTC": "비트코인",
    },
  },
  candle: {
    error: false,
    data: {
      "KRW-BTC": {
        candles: [
          // { date: new Date(), open: 1, close: 1, high: 1, low: 1, volume: 1 },
        ],
        tradePrice24Hour: 0,
        volume24Hour: 0,
        changeRate24Hour: 0,
      },
    },
  },
  orderbook: {
    error: false,
    data: {
      "KRW-BTC": {
        total_bid_size: 0,
        total_ask_size: 0,
        orderbook_units: [],
      },
    },
  },
  tradeList: {
    error: false,
    data: {},
  },
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    // 코인 마켓 이름들
    case GET_MARKET_NAMES_SUCCESS:
    case GET_MARKET_NAMES_ERROR:
      return requestActions(GET_MARKET_NAMES, "marketNames")(state, action);

    // 초기 캔들
    case GET_INIT_CANDLES_SUCCESS:
    case GET_INIT_CANDLES_ERROR:
      return requestInitActions(GET_INIT_CANDLES, "candle")(state, action);

    // 코인 한 개 정해서 200개
    case GET_ONE_COIN_CANDLES_SUCCESS:
    case GET_ONE_COIN_CANDLES_ERROR:
      return requestActions(GET_ONE_COIN_CANDLES, "candle")(state, action);

    // 추가 코인 데이터 로드
    case GET_ADDITIONAL_COIN_CANDLES_SUCCESS:
    case GET_ADDITIONAL_COIN_CANDLES_ERROR:
      return requestActions(GET_ADDITIONAL_COIN_CANDLES, "candle")(
        state,
        action
      );

    // 캔들 실시간 정보
    case CONNECT_CANDLE_SOCKET_SUCCESS:
    case CONNECT_CANDLE_SOCKET_ERROR:
      return requestActions(CONNECT_CANDLE_SOCKET, "candle")(state, action);

    // 호가창 초기값
    case GET_INIT_ORDERBOOKS_SUCCESS:
    case GET_INIT_ORDERBOOKS_ERROR:
      return requestActions(GET_INIT_ORDERBOOKS, "orderbook")(state, action);

    // 호가창 실시간 정보
    case CONNECT_ORDERBOOK_SOCKET_SUCCESS:
    case CONNECT_ORDERBOOK_SOCKET_ERROR:
      return requestActions(CONNECT_ORDERBOOK_SOCKET, "orderbook")(
        state,
        action
      );

    // 체결내역 200개 초기값
    case GET_ONE_COIN_TRADELISTS_SUCCESS:
    case GET_ONE_COIN_TRADELISTS_ERROR:
      return requestActions(GET_ONE_COIN_TRADELISTS, "tradeList")(
        state,
        action
      );

    // 체결내역 실시간 정보
    case CONNECT_TRADELIST_SOCKET_SUCCESS:
    case CONNECT_TRADELIST_SOCKET_ERROR:
      return requestActions(CONNECT_TRADELIST_SOCKET, "tradeList")(
        state,
        action
      );

    case CHANGE_COIN_MARKET_SUCCESS:
      return changeOptionActions(CHANGE_COIN_MARKET, "selectedMarket")(
        state,
        action
      );

    case CHANGE_TIME_TYPE_SUCCESS:
      return changeOptionActions(CHANGE_TIME_TYPE, "selectedTimeType")(
        state,
        action
      );

    case CHANGE_TIME_COUNT_SUCCESS:
      return changeOptionActions(CHANGE_TIME_COUNT, "selectedTimeCount")(
        state,
        action
      );

    case CHANGE_ASK_BID_ORDER_SUCCESS:
      return changeOptionActions(CHANGE_ASK_BID_ORDER, "selectedAskBidOrder")(
        state,
        action
      );

    case CHANGE_ORDER_PRICE_SUCCESS:
      return changeOptionActions(CHANGE_ORDER_PRICE, "orderPrice")(
        state,
        action
      );
    case CHANGE_ORDER_AMOUNT_SUCCESS:
      return changeOptionActions(CHANGE_ORDER_AMOUNT, "orderAmount")(
        state,
        action
      );
    case CHANGE_ORDER_TOTAL_PRICE_SUCCESS:
      return changeOptionActions(CHANGE_ORDER_TOTAL_PRICE, "orderTotalPrice")(
        state,
        action
      );

    case SEARCH_COIN_SUCCESS:
      return changeOptionActions(SEARCH_COIN, "searchCoin")(state, action);
    default:
      return state;
  }
};

export {
  startInit,
  startChangeMarketAndData,
  startAddMoreCandleData,
  changeTimeTypeAndData,
  coinReducer,
  coinSaga,
  changeAskBidOrder,
  changePriceAndTotalPrice,
  changeAmountAndTotalPrice,
  changeTotalPriceAndAmount,
  searchCoin,
};
