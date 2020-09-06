import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../Reducer/loadingReducer";

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

// 캔들용 사가
const createRequestCandleSaga = (type, api, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const res = yield call(api, action.payload);

      yield put({ type: SUCCESS, payload: dataMaker(res.data) });
      yield put(finishLoading(type));
    } catch (e) {
      yield put({ type: ERROR, payload: e });
      yield put(finishLoading(type));
      throw e;
    }
  };
};

const reducerUtils = {
  success: (state, payload) => ({
    ...state,
    data: payload,
    error: null,
  }),
  error: (state, error) => ({
    ...state,
    error: error,
  }),
};

const candleActions = (type) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case SUCCESS:
        return reducerUtils.success(state, action.payload);
      case ERROR:
        return reducerUtils.error(state, action.payload);
      default:
        return state;
    }
  };
};

export { candleDataUtils, createRequestCandleSaga, candleActions };
