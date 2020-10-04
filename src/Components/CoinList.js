import React from "react";
import styled from "styled-components";
import withCoinListData from "./withCoinListData";

const CoinListContainer = styled.div``;
const CoinUl = styled.ul``;
const CoinLi = styled.li``;

const CoinList = ({ marketNames, marketNamesArr, coinListDatas }) => {
  return (
    <CoinListContainer>
      <CoinUl>
        {marketNamesArr.map((marketName) => {
          return <CoinLi>{marketNames[marketName]}</CoinLi>;
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

export default withCoinListData()(CoinList);
