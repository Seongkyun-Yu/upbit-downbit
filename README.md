# Downbit 프로젝트 ![ViewCount](https://views.whatilearened.today/views/github/Seongkyun-Yu/upbit-clone.svg)

| [![downbit_image](https://user-images.githubusercontent.com/15887982/99421488-c6cf0080-2941-11eb-9c5f-624593075430.gif)](https://youtu.be/zsuSvv9IfM8) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                          _이미지 클릭시 YouTube로 연결됩니다_                                                          |

<br>

2020년 9월 1일부터 11월 10일 동안 매일 2시간씩 진행한 업비트 클론 프로젝트 입니다.<br>

~~[downbit.ml](https://downbit.ml)에서 배포된 프로젝트 내역을 확인하실 수 있습니다.~~<br>
두나무의 요청으로 배포를 중단했습니다.<br>

<br>

## Development motivation

Upbit의 실제 거래 데이터를 통해<br>

많은 데이터 수신시 프론트 엔드의 뷰를 최적화 하는 방법을 학습하고자<br>

이번 프로젝트를 시작하였습니다.<br>

<br>

## Skill

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)<br>
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-7F43C5?style=flat&logo=redux&logoColor=white)
![Styled-Components](https://img.shields.io/badge/-Styled%20Component-pink?style=flat-square&logo=styled-components)<br>
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=amazon-aws)

<br>

## Requirements

- Library
  <details> 
    <summary>접기/펼치기 버튼</summary>
    <div markdown="1">
      React v.16<br>
      axios: 0.20.0<br>
      d3: 5.15.1<br>
      react-redux: 7.2.1<br>
      redux-saga v.1.1.3<br>
      redux-thunk v.2.3.0<br>
      react-router-dom v.5.2.0<br>
      axios v.0.19.2<br>
      websocket: 1.0.32<br>
      react-fast-compare: 3.2.0<br>
      react-financial-charts: 1.0.0-alpha.16<br>
      decimal.js: 10.2.1<br>
      hangul-js: 0.2.6<br>
      lodash: 4.17.20<br>
      moment-timezone: 0.5.31<br>
      styled-components: 5.2.0<br>
      styled-normalize: 8.0.7<br>
      styled-reset": 4.3.0<br>
      @fortawesome/free-brands-svg-icons: 5.15.1<br>
      @fortawesome/free-solid-svg-icons: 5.15.1<br>
      @fortawesome/react-fontawesome: 0.1.12<br>
    </div>
  </details>

<br>

## Getting Started

$ git clone https://github.com/Seongkyun-Yu/upbit-clone.git<br>
$ yarn install<br>
\$ yarn start<br>

<br>

## Main Feature (프로젝트의 모든 기능을 혼자 개발했습니다)

- 실시간 가격, 거래량 등의 데이터 수신 및 차트 랜더링
- 실시간 호가창, 거래내역 랜더링
- 코인 초성, 심볼 검색
- 매수 총액에 따른 구매수량 자동 조절, 가격 변경에 따른 구매 총액 자동 변경
- 호가창 클릭시 자동 가격 입력
- 반응형

<br>

## 프로젝트 구조

```bash
├── node_modules
├── public
│   ├── blueLogo.png
│   ├── whiteLogo.png
│   ├── favicon.png
│   └── index.html
├── build
├── src
│   ├── Api
│   │   └── api.js
│   ├── Components
│   │   ├── Global
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── Loading.js
│   │   └── Main
│   │       ├── ChartDataConsole.js
│   │       ├── CoinInfoHeader.js
│   │       ├── CoinList.js
│   │       ├── CoinListItem.js
│   │       ├── MainChart.js
│   │       ├── Orderbook.js
│   │       ├── OrderbookCoinInfo.js
│   │       ├── OrderbookItem.js
│   │       ├── OrderInfo.js
│   │       ├── OrderInfoAskBid.js
│   │       ├── OrderInfoTradeList.js
│   │       ├── TradeList.js
│   │       └── TradeListItem.js
│   ├── Pages
│   │   └── Main.js
│   ├── Container                         <-- HOC
│   │   ├── withLatestCoinData.js
│   │   ├── withLoadingData.js
│   │   ├── withMarketNames.js
│   │   ├── withOHLCData.js
│   │   └── ...etc
│   ├── Lib
│   │   ├── asyncUtil.js                  <-- redux-saga, thunk factory pattern
│   │   └── utils.js                      <-- etc utils
│   ├── Reducer
│   │   ├── index.js
│   │   ├── coinReducer.js
│   │   └── loadingReducer.js
│   ├── Router
│   │   └── MainRouter.js
│   ├── styles
│   │   ├── fonts
│   │   ├── GlobalStyle.js
│   │   └── theme.js
│   ├── App.js
│   └── index.js
├── README.md
├── LICENSE
├── package.json
├── yarn.lock
└── .gitignore
```

<br>

## 프로젝트 관련 생각들


- [buffer를 활용하여 상태 갱신 줄이기](https://velog.io/@seongkyun/React-%EC%B5%9C%EC%A0%81%ED%99%94-buffer%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EC%83%81%ED%83%9C-%EA%B0%B1%EC%8B%A0-%EC%A4%84%EC%9D%B4%EA%B8%B0)
- [throttle로 이벤트 캐치 줄이기](https://velog.io/@seongkyun/React-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%98%EC%9D%91%ED%98%95%EA%B3%BC-display-none)
<br>

## Technical Issue: Optimization

- 1초에 최대 150개의 데이터가 전송되어 상태를 변경시킴
  <!-- - <details>
    <summary>해결 코드 접기/펼치기 버튼</summary>
    <div markdown="1">

    ```javascript
    import { call, put, select, flush, delay } from "redux-saga/effects";
    import { buffers, eventChannel } from "redux-saga";

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

        while (true) {
          try {
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

              yield put({
                type: SUCCESS,
                payload: dataMaker(sortedData, state),
              });
            }
            yield delay(500); // 500ms 동안 대기
          } catch (e) {
            yield put({ type: ERROR, payload: e });
          }
        }
      };
    };
    ```

    </div>
    </details> -->

  - Push 방식의 WebSocket을 Redux-Saga를 이용하여 Pull 방식으로 변경
  - Redux-Saga의 eventChannel을 이용하여 버퍼 생성
  - 0.5초에 한 번 버퍼를 확인하여 중복된 데이터 제거 후 변경내역을 상태에 한번에 업데이트

  - ```javascript
    import { call, put, select, flush, delay } from "redux-saga/effects";
    import { buffers, eventChannel } from "redux-saga";

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

        while (true) {
          try {
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

              yield put({
                type: SUCCESS,
                payload: dataMaker(sortedData, state),
              });
            }
            yield delay(500); // 500ms 동안 대기
          } catch (e) {
            yield put({ type: ERROR, payload: e });
          }
        }
      };
    };
    ```

- 반응형으로 제작시 보이지 않는 컴포넌트를 랜더링 처리

  <!-- - <details>
    <summary>해결 코드 접기/펼치기 버튼</summary>
    <div markdown="1">

    ```javascript
    import React, { useCallback, useEffect, useState } from "react";
    import { throttle } from "lodash";

    const withSize = () => (OriginalComponent) => (props) => {
      const [widthSize, setWidthSize] = useState(window.innerWidth);
      const [heightSize, setHeightSize] = useState(window.innerHeight);

      const handleSize = useCallback(() => {
        setWidthSize(window.innerWidth);
        setHeightSize(window.innerHeight);
      }, []);

      useEffect(() => {
        window.addEventListener("resize", throttle(handleSize, 200));
        return () => {
          window.removeEventListener("resize", handleSize);
        };
      }, [handleSize]);

      return (
        <OriginalComponent
          {...props}
          widthSize={widthSize}
          heightSize={heightSize}
        />
      );
    };

    export default withSize;
    ```

    </div>
    </details> -->

  - display: none으로 처리해도 DOM에는 사라지지 않기 때문에 상태 변경시 랜더링 시도함

  - width 값을 측정하여 조건이 맞을 경우에만 컴포넌트를 랜더링 하게 함
  - throttle 사용으로 과도한 width값 측정 방지
  - ```javascript
    import React, { useCallback, useEffect, useState } from "react";
    import { throttle } from "lodash";

    const withSize = () => (OriginalComponent) => (props) => {
      const [widthSize, setWidthSize] = useState(window.innerWidth);
      const [heightSize, setHeightSize] = useState(window.innerHeight);

      const handleSize = useCallback(() => {
        setWidthSize(window.innerWidth);
        setHeightSize(window.innerHeight);
      }, []);

      useEffect(() => {
        window.addEventListener("resize", throttle(handleSize, 200));
        return () => {
          window.removeEventListener("resize", handleSize);
        };
      }, [handleSize]);

      return (
        <OriginalComponent
          {...props}
          widthSize={widthSize}
          heightSize={heightSize}
        />
      );
    };
    export default withSize;
    ```

- 초기 차트 데이터를 얼마나 가져와야 하는지에 대한 문제
  - 200개의 캔들을 먼저 가져오고 필요할 시 추가로 요청 후 랜더링

<br>

## Todo

- [x] WebSocket 통신<br>
- [x] 기본 Reducer 제작<br>
- [x] Thunk Factory Pattern 제작<br>
- [x] Saga Factory Pattern 제작<br>
- [x] 캔들 차트 드로잉<br>
- [x] 호가 차트 드로잉<br>
- [x] 주문 창 구현<br>
