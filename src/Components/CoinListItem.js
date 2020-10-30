import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { numWithComma } from "../Lib/utils";
import { startChangeMarketAndData } from "../Reducer/coinReducer";

const CoinLi = styled.li`
  height: 45px;
  border-bottom: 1px solid ${(props) => props.borderBottomColor};
  &:last-child {
    border-bottom: none;
  }
  background-color: ${(props) => props.bgColor};
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

const CoinName = styled.strong`
  display: block;
  font-size: 12px;
  font-weight: 1800;
`;

const CoinNameEn = styled.span`
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

const TradePrice = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  width: 98px;
  height: 100%;
  text-align: right;
`;

const CoinListItem = ({
  theme,
  selectedMarket,
  marketName,
  coinName,
  enCoinName,
  fontColor,
  price,
  changeRate24Hour,
  changePrice24Hour,
  tradePrice24Hour,
}) => {
  const dispatch = useDispatch();
  const changeMarket = useCallback(
    () => dispatch(startChangeMarketAndData(marketName)),
    [dispatch, marketName]
  );
  return (
    <CoinLi
      borderBottomColor={theme.lightGray}
      bgColor={selectedMarket === marketName ? theme.lightGray : "white"}
    >
      <CoinBtn onClick={changeMarket}>
        <CoinNameContainer>
          <CoinName>{coinName}</CoinName>
          <CoinNameEn>{enCoinName}</CoinNameEn>
        </CoinNameContainer>
        <Price color={fontColor}>{numWithComma(price)}</Price>
        <ChangRateContainer>
          <ChangeRate color={fontColor}>{changeRate24Hour}</ChangeRate>
          <ChangePrice color={fontColor}>
            {numWithComma(changePrice24Hour)}
          </ChangePrice>
        </ChangRateContainer>
        <TradePrice>{numWithComma(tradePrice24Hour) + " 백만"}</TradePrice>
      </CoinBtn>
    </CoinLi>
  );
};

export default React.memo(CoinListItem);
