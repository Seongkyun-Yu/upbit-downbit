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
