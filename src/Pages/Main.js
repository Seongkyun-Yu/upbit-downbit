import React, { useContext, useEffect } from "react";
import CoinList from "../Components/CoinList";
import Header from "../Components/Header";
import MainChart from "../Components/MainChart";
import styled, { ThemeContext } from "styled-components";
import Orderbook from "../Components/Orderbook";
import CoinInfoHeader from "../Components/CoinInfoHeader";
import OrderInfo from "../Components/OrderInfo";
import TradeList from "../Components/TradeList";
import { useDispatch } from "react-redux";
import { startInit } from "../Reducer/coinReducer";

const MainContentContainer = styled.main`
  display: flex;
  justify-content: center;
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const ChartAndTradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 950px;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TradeContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const Main = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  return (
    <div className="container" style={{ height: "100%" }}>
      <Header />
      <MainContentContainer>
        <ChartAndTradeContainer theme={theme}>
          {/* <CoinList subList={true} /> */}
          <CoinInfoHeader />
          <div
            className="mainChartContainer"
            style={{
              width: "100%",
              height: 500,
              // borderTop: "1px solid rgb(212, 214, 220)",
            }}
          >
            <MainChart />
          </div>

          <TradeContainer>
            <Orderbook />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "55%",
                marginLeft: "10px",
              }}
            >
              <OrderInfo />
              <TradeList />
            </div>
          </TradeContainer>
        </ChartAndTradeContainer>

        <CoinList />
      </MainContentContainer>
    </div>
  );
};

export default Main;
