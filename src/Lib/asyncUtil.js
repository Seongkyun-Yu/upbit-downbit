import { call, put } from "redux-saga/effects";

const candleDataUtils = {
  init: (candles) => {
    const data = {};
    candles.forEach((candle) => {
      if (candle.market.split("-")[0] !== "KRW") return;

      data[candle.market] = {};
      data[candle.market]["candles"].push({
        date: candle.trade_date,
        time: candle.trade_time,
        dateKst: candle.trade_date_kst,
        timeKst: candle.trade_time_kst,
        open: candle.opening_price,
        high: candle.high_price,
        low: candle.low_price,
        close: candle.trade_price,
        volume: candle.acc_trade_volume,
        tradePrice: candle.acc_trade_price,
        timestamp: candle.timestamp,
      });
      data[candle.market]["accTradePrice"] = candle.acc_trade_price_24h;
      data[candle.market]["accTradeVolume"] = candle.acc_trade_volume_24h;
      data[candle.market]["changeRate"] = candle.signed_change_rate;
      data[candle.market]["cahnagePrice"] = candle.signed_change_price;
      data[candle.market]["highest52WeekPrice"] = candle.highest_52_week_price;
      data[candle.market]["highest52WeekDate"] = candle.highest_52_week_date;
      data[candle.market]["lowest52WeekPrice"] = candle.lowest_52_week_price;
      data[candle.market]["lowest52WeekDate"] = candle.lowest_52_week_date;
    });

    return data;
  },
  update: () => {},
  oneCoin: () => {},
  marketNames: (names) => {
    const data = {};
    names.forEach((name) => {
      if (name.market.split("-")[0] !== "KRW") return;
      data[name.market] = name.korean_name;
    });

    return data;
  },
};

// const candleDataMaker = (state, candles) => {
//   candles.map((candle) => Object.keys(candle)[0]);
// };

const candleReducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

// 1개의 코인의 전체 캔들 정보 가져올 때 쓰는 saga
const createRequestCandleSaga = (type, api) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* (action) {
    yield put(type);
    try {
      const res = yield call(api, action.payload);

      yield put({ type: SUCCESS, payload: res.data });
    } catch (e) {
      yield put({ type: ERROR, payload: e });
      throw e;
    }
  };
};

const candleActions = (type, key, name) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            loading: true,
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            da: action.payload,
            loading: false,
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            loading: false,
            error: true,
            errorMsg: action.payload,
          },
        };
      default:
        return state;
    }
  };
};

export { createRequestCandleSaga, candleActions };
