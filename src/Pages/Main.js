import React, { useContext } from "react";
import CoinList from "../Components/CoinList";
import Header from "../Components/Header";
import MainChart from "../Components/MainChart";
import styled, { ThemeContext } from "styled-components";
import Orderbook from "../Components/Orderbook";
import CoinInfoHeader from "../Components/CoinInfoHeader";
import OrderInfo from "../Components/OrderInfo";
import TradeList from "../Components/TradeList";
import { useSelector } from "react-redux";
import OrderbookContainer from "../Container/OrderbookContainer";

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

  @media ${(props) => (props.isRootURL ? props.theme.tablet : true)} {
    display: none;
  }
`;

const TradeContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const Main = ({ match }) => {
  // const theme = useContext(ThemeContext);

  // const state = useSelector((state) => state);
  // const coinState = state.Coin;
  // const selectedMarket = state.Coin.selectedMarket;

  // const splitedName = selectedMarket.split("-");
  // const coinSymbol = splitedName[1];

  const isRootURL = match.path === "/";
  // console.log("메인리로딩");

  return (
    <div className="container" style={{ height: "100%" }}>
      <Header />
      <MainContentContainer>
        <ChartAndTradeContainer isRootURL={isRootURL}>
          <CoinInfoHeader />
          <div
            className="mainChartContainer"
            style={{
              width: "100%",
              height: 500,
            }}
          >
            <MainChart />
          </div>

          <TradeContainer>
            <Orderbook />
            {/* <OrderbookContainer /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "55%",
                minWidth: "180px",
                marginLeft: "10px",
              }}
            >
              {/* <OrderInfo
                theme={theme}
                coinSymbol={coinSymbol}
                orderPrice={coinState.orderPrice}
                orderAmount={coinState.orderAmount}
                orderTotalPrice={coinState.orderTotalPrice}
                selectedAskBidOrder={coinState.selectedAskBidOrder}
              /> */}
              <OrderInfo
              // theme={theme}
              // coinSymbol={coinSymbol}
              // orderPrice={coinState.orderPrice}
              // orderAmount={coinState.orderAmount}
              // orderTotalPrice={coinState.orderTotalPrice}
              // selectedAskBidOrder={coinState.selectedAskBidOrder}
              />
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
