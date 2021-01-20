import { w3cwebsocket as W3CWebSocket } from "websocket";
import { call, put, select, flush, delay } from "redux-saga/effects";
import { startLoading, finishLoading } from "../Reducer/loadingReducer";
import { throttle } from "lodash";
import { buffers, eventChannel, END } from "redux-saga";
import encoding from "text-encoding";

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
      const enc = new encoding.TextDecoder("utf-8");
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
      const enc = new encoding.TextDecoder("utf-8");
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

// 소켓 만들기
const createSocket = () => {
  const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
  client.binaryType = "arraybuffer";

  return client;
};

// 소켓 연결용
const connectSocekt = (socket, connectType, action, buffer) => {
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
      const enc = new encoding.TextDecoder("utf-8");
      // const arr = new Uint8Array(evt.data);
      const data = JSON.parse(enc.decode(evt.data));

      emit(data);
    };

    socket.onerror = (evt) => {
      emit(evt);
      emit(END);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

// 웹소켓 연결용 사가
const createConnectSocketSaga = (type, connectType, dataMaker) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* (action = {}) {
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocekt,
      client,
      connectType,
      action,
      buffers.expanding(500)
    );

    try {
      while (true) {
        const datas = yield flush(clientChannel); // 버퍼 데이터 가져오기
        const state = yield select();

        if (datas.length) {
          const sortedObj = {};
          datas.forEach((data) => {
            if (sortedObj[data.code]) {
              // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
              sortedObj[data.code] =
                sortedObj[data.code].timestamp > data.timestamp
                  ? sortedObj[data.code]
                  : data;
            } else {
              sortedObj[data.code] = data; // 새로운 데이터면 그냥 넣음
            }
          });

          const sortedData = Object.keys(sortedObj).map(
            (data) => sortedObj[data]
          );

          yield put({ type: SUCCESS, payload: dataMaker(sortedData, state) });
        }
        yield delay(500); // 500ms 동안 대기
      }
    } catch (e) {
      yield put({ type: ERROR, payload: e });
    } finally {
      clientChannel.close(); // emit(END) 접근시 소켓 닫기
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
