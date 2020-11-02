import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: left;
`;

const CoinLogo = styled.i`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: ${(props) =>
    `url(https://static.upbit.com/logos/${props.coinNameEn}.png)`};
  background-size: cover;
  margin-left: 5px;
  margin-right: 15px;
`;

const CoinNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 94px; */
  width: 20%;
  min-width: 55px;
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
  /* width: 94px; */
  width: 20%;
  min-width: 55px;
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
  /* width: 58px; */
  width: 20%;
  min-width: 55px;
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
  /* width: 98px; */
  width: 25%;
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
  const history = useHistory();

  const changeMarket = useCallback(() => {
    dispatch(startChangeMarketAndData(marketName));
    history.push("/trade");
  }, [dispatch, marketName, history]);

  return (
    <CoinLi
      borderBottomColor={theme.lightGray}
      bgColor={selectedMarket === marketName ? theme.lightGray : "white"}
    >
      <CoinBtn onClick={changeMarket}>
        <CoinLogo coinNameEn={enCoinName.split("/")[0]} />
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
