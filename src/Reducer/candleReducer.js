import { handleActions } from "../Lib/asyncUtil";

const GET_MARKET_NAMES = "candle/GET_MARKET_NAMES";
const GET_MARKET_NAMES_SUCCESS = "candle/GET_MARKET_NAMES_SUCCESS";
const GET_MARKET_NAMES_ERROR = "candle/GET_MARKET_NAMES_ERROR";

const CONNECT_CANDLE_SOCKET = "candle/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "candle/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "candle/CONNECT_CANDLE_SOCKET_ERROR";

const GET_ALL_CANDLE = "candle/GET_ALL_CANDLE";
const GET_ALL_CANDLE_SUCCESS = "candle/GET_ALL_CANDLE_SUCCESS";
const GET_ALL_CANDLE_ERROR = "candle/GET_ALL_CANDLE_ERROR";

const initialState = {
  marketName: {
    loading: false,
    error: null,
    data: {
      "KRW-BTC": "비트코인",
    },
  },
  candle: {
    loading: false,
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
    case GET_MARKET_NAMES:
    case GET_MARKET_NAMES_SUCCESS:
    case GET_MARKET_NAMES_ERROR:
      return handleActions(GET_MARKET_NAMES);
    default:
      return state;
  }
};

export { candleReducer };
