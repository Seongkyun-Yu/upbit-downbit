import React from "react";
import styled from "styled-components";
import withCoinListData from "./withCoinListData";

const CoinListContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;
  max-height: 770px;
  overflow: hidden;
`;
const CoinUl = styled.ul`
  height: 100%;
  max-height: 770px;
  overflow: hidden;
`;
const CoinLi = styled.li`
  height: 45px;
`;

const CoinBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
`;

const CoinNameKor = styled.span`
  display: block;
  height: 12px;
`;

const CoinList = ({ marketNames, marketNamesArr, coinListDatas }) => {
  return (
    <CoinListContainer>
      <CoinUl>
        {marketNamesArr.map((marketName) => {
          return (
            <CoinLi>
              <CoinBtn>
                <CoinNameKor>{marketNames[marketName]}</CoinNameKor>
              </CoinBtn>
            </CoinLi>
          );
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

export default withCoinListData()(CoinList);
