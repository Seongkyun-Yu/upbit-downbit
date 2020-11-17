# Downbit 프로젝트

![](https://user-images.githubusercontent.com/15887982/99421488-c6cf0080-2941-11eb-9c5f-624593075430.gif)

2020년 9월 1일부터 매일 2시간씩 진행중인 업비트 클론 프로젝트 입니다.<br>
(Front-End 완료, Back-End 공부중)

[downbit.ml](https://downbit.ml)에서 배포된 프로젝트 내역을 확인하실 수 있습니다.

<br>

## Getting Started

$ git clone https://github.com/Seongkyun-Yu/upbit-clone.git<br>
$ yarn install<br>
\$ yarn start<br>

<br>

## Skill

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
<br>
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-7F43C5?style=flat&logo=redux&logoColor=white)
![Styled-Components](https://img.shields.io/badge/-Styled%20Component-pink?style=flat-square&logo=styled-components)
<br>
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=amazon-aws)

<br>

## Main Feature

- 실시간 가격, 거래량 등의 데이터 수신 및 차트 랜더링
- 실시간 호가창, 거래내역 랜더링
- 코인 초성, 심볼 검색
- 매수 총액에 따른 구매수량 자동 조절, 가격 변경에 따른 구매 총액 자동 변경
- 호가창 클릭시 자동 가격 입력
- 반응형

<br>

## Technical Issue: Optimization

- 1초에 최대 150개의 데이터가 전송되어 상태를 변경시킴
  - Push 방식의 WebSocket을 Redux-Saga를 이용하여 Pull 방식으로 변경
  - Redux-Saga의 eventChannel을 이용하여 버퍼 생성
  - 0.5초에 한 번 버퍼를 확인하여 중복된 데이터 제거 후 변경내역을 상태에 한번에 업데이트
- 반응형으로 제작시 보이지 않는 컴포넌트를 랜더링 처리

  - display: none으로 처리해도 DOM에는 사라지지 않기 때문에 상태 변경시 랜더링 시도함
  - width 값을 측정하여 조건이 맞을 경우에만 컴포넌트를 랜더링 하게 함
  - throttle 사용으로 과도한 width값 측정 방지

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

- [ ] 회원가입/로그인<br>
- [ ] 거래 구현<br>
