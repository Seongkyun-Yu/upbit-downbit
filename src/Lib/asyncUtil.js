import { w3cwebsocket as W3CWebSocket } from "websocket";
import { call, put, select } from "redux-saga/effects";
import { startLoading, finishLoading } from "../Reducer/loadingReducer";

// 캔들용 사가
const createRequestSaga = (type, api, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* (action = {}) {
    yield put(startLoading(type));
    try {
      const res = yield call(api, action.payload);
      const state = yield select();

      yield put({ type: SUCCESS, payload: dataMaker(res.data, state) });
      yield put(finishLoading(type));
    } catch (e) {
      yield put({ type: ERROR, payload: e });
      yield put(finishLoading(type));
      throw e;
    }
  };
};

// 선택 옵션 변경용 사가
const createChangeOptionSaga = (type) => {
  const SUCCESS = `${type}_SUCCESS`;

  return function* (action = {}) {
    yield put({ type: SUCCESS, payload: action.payload });
  };
};

// 웹소켓 연결용 Thunk
const createConnectSocketThunk = (type, connectType, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return (action = {}) => (dispatch, getState) => {
    const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
    client.binaryType = "arraybuffer";

    client.onopen = () => {
      client.send(
        JSON.stringify([
          { ticket: "downbit-clone" },
          { type: connectType, codes: action.payload },
        ])
      );
    };

    client.onmessage = (evt) => {
      const enc = new TextDecoder("utf-8");
      const arr = new Uint8Array(evt.data);
      const data = JSON.parse(enc.decode(arr));
      const state = getState();

      dispatch({ type: SUCCESS, payload: dataMaker(data, state) });
    };

    client.onerror = (e) => {
      dispatch({ type: ERROR, payload: e });
    };
  };
};

const reducerUtils = {
  success: (state, payload, key) => {
    return {
      ...state,
      [key]: {
        data: payload,
        error: false,
      },
    };
  },
  error: (state, error, key) => ({
    ...state,
    [key]: {
      ...state[key],
      error: error,
    },
  }),
};

const requestActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case SUCCESS:
        return reducerUtils.success(state, action.payload, key);
      case ERROR:
        return reducerUtils.error(state, action.payload, key);
      default:
        return state;
    }
  };
};

const requestInitActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          candleDay: {
            data: action.payload,
            error: false,
          },
          [key]: {
            data: action.payload,
            error: false,
          },
        };
      case ERROR:
        return {
          ...state,
          candleDay: {
            ...state.candleDay,
            error: action.payload,
          },
          [key]: {
            ...state[key],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
};

const changeOptionActions = (type, key) => {
  const SUCCESS = `${type}_SUCCESS`;
  return (state, action) => {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          [key]: action.payload,
        };
      default:
        return state;
    }
  };
};

export {
  createRequestSaga,
  createConnectSocketThunk,
  createChangeOptionSaga,
  requestActions,
  requestInitActions,
  changeOptionActions,
};
