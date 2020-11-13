import { w3cwebsocket as W3CWebSocket } from "websocket";
import { call, put, select, take, flush, delay } from "redux-saga/effects";
import { startLoading, finishLoading } from "../Reducer/loadingReducer";
import { throttle } from "lodash";
import { buffers, eventChannel } from "redux-saga";

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

// 웹소켓 연결용 Thunk
const createConnectSocketThrottleThunk = (type, connectType, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  const throttleDispatch = throttle((dispatch, state, data) => {
    dispatch({ type: SUCCESS, payload: dataMaker(data, state) });
  }, 500);

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

      // dispatch({ type: SUCCESS, payload: dataMaker(data, state) });
      throttleDispatch(dispatch, state, data);
    };

    client.onerror = (e) => {
      dispatch({ type: ERROR, payload: e });
    };
  };
};

// 웹소켓 연결용 사가
const createConnectSocketSaga = (type, connectType, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  const createSocket = () => {
    const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
    client.binaryType = "arraybuffer";

    return client;
  };

  const connectSocekt = (socket, action, buffer) => {
    return eventChannel((emit) => {
      socket.onopen = () => {
        socket.send(
          JSON.stringify([
            { ticket: "downbit-clone" },
            { type: connectType, codes: action.payload },
          ])
        );
      };

      socket.onmessage = (evt) => {
        const enc = new TextDecoder("utf-8");
        const arr = new Uint8Array(evt.data);
        const data = JSON.parse(enc.decode(arr));

        emit(data);
      };

      socket.onerror = (evt) => {
        emit(evt);
      };

      const unsubscribe = () => {
        socket.close();
      };

      return unsubscribe;
    }, buffer || buffers.none());
  };

  return function* (action = {}) {
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocekt,
      client,
      action,
      buffers.expanding(100)
    );

    while (true) {
      try {
        const datas = yield flush(clientChannel);
        const state = yield select();

        if (datas.length) {
          const sortedObj = {};
          datas.forEach((data) => {
            if (sortedObj[data.code]) {
              sortedObj[data.code] =
                sortedObj[data.code].timestamp > data.timestamp
                  ? sortedObj[data.code]
                  : data;
            } else {
              sortedObj[data.code] = data;
            }
          });

          const sortedData = Object.keys(sortedObj).map(
            (data) => sortedObj[data]
          );

          yield put({ type: SUCCESS, payload: dataMaker(sortedData, state) });

          // console.log(sortedData);
        }
        yield delay(500);
      } catch (e) {
        yield put({ type: ERROR, payload: e });
      }
    }
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
  createConnectSocketThrottleThunk,
  createConnectSocketSaga,
  createChangeOptionSaga,
  requestActions,
  requestInitActions,
  changeOptionActions,
};
