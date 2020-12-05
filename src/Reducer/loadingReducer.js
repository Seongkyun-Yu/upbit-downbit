const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

const startLoading = (payload) => ({ type: START_LOADING, payload });
const finishLoading = (payload) => ({ type: FINISH_LOADING, payload });

const initialState = {
  "coin/GET_ONE_COIN_CANDLES": true,
  "coin/GET_INIT_ORDERBOOKS": true,
  "coin/GET_ONE_COIN_TRADELISTS": true,
  "coin/GET_INIT_CANDLES": true,
  "coin/GET_MARKET_NAMES": true,
  "coin/GET_ADDITIONAL_COIN_CANDLES": false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        [action.payload]: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};

export { startLoading, finishLoading, loadingReducer };
