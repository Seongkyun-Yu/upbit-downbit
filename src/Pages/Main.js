import React from "react";
import styled from "styled-components";

import Header from "../Components/Global/Header";
import CoinList from "../Components/CoinList";

import MainChart from "../Components/MainChart";
import Orderbook from "../Components/Orderbook";
import CoinInfoHeader from "../Components/CoinInfoHeader";
import OrderInfo from "../Components/OrderInfo";
import TradeList from "../Components/TradeList";
import ChartDataConsole from "../Components/ChartDataConsole";
import Footer from "../Components/Global/Footer";
import withSize from "../Container/withSize";

const St = {
  MainContentContainer: styled.main`
    display: flex;
    justify-content: center;
    max-width: 1500px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 50px;
    width: 100%;
    height: 100%;

    @media ${({ theme }) => theme.tablet} {
      margin-top: 0;
      margin-bottom: 0;
    }
  `,

  ChartAndTradeContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 950px;

    @media ${(props) => (props.isRootURL ? props.theme.tablet : true)} {
      display: none;
    }
  `,
  MainChartContainer: styled.div`
    width: 100%;
    height: 500;
  `,

  TradeInfoContainer: styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
  `,

  TradeOrderContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    min-width: 180px;
    margin-left: 10px;
  `,
};

const Main = ({ match, widthSize, heightSize }) => {
  const isRootURL = match.path === "/";

  return (
    <>
      <Header isRootURL={isRootURL} />
      <St.MainContentContainer>
        <St.ChartAndTradeContainer isRootURL={isRootURL}>
          <CoinInfoHeader />
          <ChartDataConsole />
          <div // 스타일드 컴포넌트로는 차트 라이브러리 사이즈가 동적으로 설정되지 않아서 할 수 없이 이렇게 선언함
            className="mainChartContainer"
            style={{
              width: "100%",
              height: 500,
            }}
          >
            <MainChart />
          </div>

          <St.TradeInfoContainer>
            <Orderbook />
            <St.TradeOrderContainer>
              <OrderInfo />
              <TradeList />
            </St.TradeOrderContainer>
          </St.TradeInfoContainer>
        </St.ChartAndTradeContainer>

        <CoinList widthSize={widthSize} heightSize={heightSize} />
      </St.MainContentContainer>
      <Footer />
    </>
  );
};

export default withSize()(React.memo(Main));
