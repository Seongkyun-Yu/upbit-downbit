import React from "react";
import CoinList from "../Components/CoinList";
import Header from "../Components/Header";
import MainChart from "../Components/MainChart";
import styled from "styled-components";
import Orderbook from "../Components/Orderbook";

const MainContentContainer = styled.main`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
`;

const TradeContainer = styled.div`
  width: 100%;
`;

const Main = () => {
  return (
    <div className="container">
      <Header />
      <MainContentContainer>
        <div
          className="mainChartContainer"
          style={{ width: "70%", height: 500 }}
        >
          <MainChart />
          <TradeContainer>
            <Orderbook />
          </TradeContainer>
        </div>

        <CoinList />
      </MainContentContainer>
    </div>
  );
};

export default Main;
