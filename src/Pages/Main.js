import React from "react";
import CoinList from "../Components/CoinList";
import Header from "../Components/Header";
import MainChart from "../Components/MainChart";
import styled from "styled-components";

// const MainChartContainer = styled.div`
//   width: 100%;
//   height: 30%;
// `;

const Main = () => {
  return (
    <div className="container">
      <Header />
      <div className="mainChartContainer" style={{ width: "70%", height: 500 }}>
        <MainChart />
      </div>

      <CoinList />
    </div>
  );
};

export default Main;
