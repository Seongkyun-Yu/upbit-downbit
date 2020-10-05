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
  display: flex;
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

const Price = styled.strong`
  display: block;
  width: 94px;
  height: 100%;
  text-align: right;
  line-height: 2.5rem;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const ChangRateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 58px;
  height: 100%;
  text-align: right;
`;

const ChangeRate = styled.span`
  display: block;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const ChangePrice = styled.span`
  display: block;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const CoinList = ({ marketNames, marketNamesArr, coinListDatas, theme }) => {
  // console.log(coinListDatas);
  return (
    <CoinListContainer>
      <CoinUl>
        {marketNamesArr.map((marketName) => {
          const splitedName = marketName.split("-");
          const enCoinName = splitedName[1] + "/" + splitedName[0];
          const changePrice = coinListDatas[marketName].changePrice;
          const fontColor = +changePrice > 0 ? theme.priceUp : theme.priceDown;
          return (
            <CoinLi>
              <CoinBtn>
                <CoinNameContainer>
                  <CoinName>{marketNames[marketName]}</CoinName>
                  <CoinName>{enCoinName}</CoinName>
                </CoinNameContainer>
                <Price color={fontColor}>
                  {
                    coinListDatas[marketName].candles[
                      coinListDatas[marketName].candles.length - 1
                    ].close
                  }
                </Price>
                <ChangRateContainer>
                  <ChangeRate color={fontColor}>
                    {(
                      Math.round(coinListDatas[marketName].changeRate * 10000) /
                      100
                    ).toFixed(2) + "%"}
                  </ChangeRate>
                  <ChangePrice color={fontColor}>
                    {coinListDatas[marketName].changePrice}
                  </ChangePrice>
                </ChangRateContainer>
              </CoinBtn>
            </CoinLi>
          );
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

export default withCoinListData()(CoinList);
