import { call, put } from "redux-saga/effects";

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
            [name]: action.payload,
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
