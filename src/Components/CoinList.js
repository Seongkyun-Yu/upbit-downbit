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
  border: 1px solid silver;
`;
const CoinLi = styled.li`
  height: 45px;
  border-bottom: 1px solid silver;
  &:last-child {
    border-bottom: none;
  }
`;

const CoinBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: left;
`;

const CoinNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 94px;
  height: 45px;
`;

const CoinName = styled.span`
  display: block;
  font-size: 12px;
`;

const CoinList = ({ marketNames, marketNamesArr, coinListDatas }) => {
  return (
    <CoinListContainer>
      <CoinUl>
        {marketNamesArr.map((marketName) => {
          const splitedName = marketName.split("-");
          const enCoinName = splitedName[1] + "/" + splitedName[0];
          return (
            <CoinLi>
              <CoinBtn>
                <CoinNameContainer>
                  <CoinName>{marketNames[marketName]}</CoinName>
                  <CoinName>{enCoinName}</CoinName>
                </CoinNameContainer>
              </CoinBtn>
            </CoinLi>
          );
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

export default withCoinListData()(CoinList);
