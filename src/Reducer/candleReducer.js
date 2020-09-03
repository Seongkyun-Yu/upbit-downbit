const CONNECT_CANDLE_SOCKET = "candle/CONNECT_CANDLE_SOCKET";
const CONNECT_CANDLE_SOCKET_SUCCESS = "candle/CONNECT_CANDLE_SOCKET_SUCCESS";
const CONNECT_CANDLE_SOCKET_ERROR = "candle/CONNECT_CANDLE_SOCKET_ERROR";

const GET_ALL_CANDLE = "candle/GET_ALL_CANDLE";
const GET_ALL_CANDLE_SUCCESS = "candle/GET_ALL_CANDLE_SUCCESS";
const GET_ALL_CANDLE_ERROR = "candle/GET_ALL_CANDLE_ERROR";

const initialState = {
  socket: {
    loading: false,
    error: "",
    errorMsg: "",
  },
  candle: {
    loading: false,
    error: "",
    errorMsg: "",
    "KRW-BTC": [],
    "KRW-ETH": [],
    "KRW-BCH": [],
    "KRW-XRP": [],
    "KRW-EOS": [],
    "KRW-TRX": [],
    "KRW-XLM": [],
    "KRW-ADA": [],
    "KRW-NEO": [],
  },
};

const candleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_CANDLE_SOCKET:
    default:
      return state;
  }
};

export { candleReducer };
