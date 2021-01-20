import React from "react";
import styled from "styled-components";
import withSize from "../Container/withSize";
import { viewSize } from "../styles/theme";

import Header from "../Components/Global/Header";
import CoinInfoHeader from "../Components/Main/CoinInfoHeader";
import ChartDataConsole from "../Components/Main/ChartDataConsole";
import MainChart from "../Components/Main/MainChart";
import Orderbook from "../Components/Main/Orderbook";
import OrderInfo from "../Components/Main/OrderInfo";
import TradeList from "../Components/Main/TradeList";
import CoinList from "../Components/Main/CoinList";
import Footer from "../Components/Global/Footer";

const St = {
  MainContentContainer: styled.div`
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
  ChartAndTradeContainer: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 950px;

    @media ${(props) => (props.isRootURL ? props.theme.tablet : true)} {
      display: none;
    }
  `,
  HiddenH2: styled.h2`
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0);
    clip-path: polygon(0, 0);
    overflow: hidden;
    text-indent: -9999px;
  `,
  MainChartContainer: styled.div`
    width: 100%;
    height: 500;
  `,
  TradeInfoContainer: styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    @media ${({ theme }) => theme.mobileM} {
      margin-top: 0;
    }
  `,
  TradeOrderContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    min-width: 180px;
    margin-left: 10px;
    @media ${({ theme }) => theme.mobileM} {
      margin-left: 0;
      border: 2px solid ${({ theme }) => theme.lightGray1};
      /* border-top: 1px solid ${({ theme }) => theme.lightGray1};
      border-bottom: 1px solid ${({ theme }) => theme.lightGray1};
      border-left: 1px solid ${({ theme }) => theme.lightGray1}; */
    }
  `,
};

const Main = ({ match, widthSize, heightSize }) => {
  const isRootURL = match.path === "/";

  return (
    <>
      <Header isRootURL={isRootURL} />
      <St.MainContentContainer>
        {
          // 차트 및 주문 관련 뷰는 메인 페이지이면서 tablet 사이즈보다 크거나, 메인 페이지가 아닌 경우에만 그린다
          ((isRootURL && widthSize > viewSize.tablet) || !isRootURL) && (
            <St.ChartAndTradeContainer isRootURL={isRootURL}>
              <St.HiddenH2>차트 및 주문 정보 창</St.HiddenH2>
              <CoinInfoHeader />
              <ChartDataConsole />
              <MainChart />
              <St.TradeInfoContainer>
                <Orderbook />
                <St.TradeOrderContainer>
                  <OrderInfo />
                  <TradeList />
                </St.TradeOrderContainer>
              </St.TradeInfoContainer>
            </St.ChartAndTradeContainer>
          )
        }
        {
          // 코인 리스트 뷰는 메인 페이지이거나, 메인 페이지가 아니면서  tablet 사이즈보다 큰  경우에만 그린다
          (isRootURL || (!isRootURL && widthSize > viewSize.tablet)) && (
            <CoinList
              widthSize={widthSize}
              heightSize={heightSize}
              isRootURL={isRootURL}
            />
          )
        }
      </St.MainContentContainer>
      <Footer />
    </>
  );
};

export default withSize()(React.memo(Main));
