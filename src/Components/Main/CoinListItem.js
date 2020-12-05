import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { startChangeMarketAndData } from "../../Reducer/coinReducer";

import isEqual from "react-fast-compare";

const St = {
  CoinLi: styled.li`
    width: 100%;
    height: 45px;

    border-bottom: 1px solid ${({ borderBottomColor }) => borderBottomColor};
    &:last-child {
      border-bottom: none;
    }
    background-color: ${({ bgColor }) => bgColor};
  `,
  CoinBtn: styled.button`
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
  `,
  CoinLogo: styled.i`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: ${({ coinNameEn }) =>
      coinNameEn !== "ADX"
        ? `url(https://static.upbit.com/logos/${coinNameEn}.png)`
        : "../styles/img/ADX.png"};
    background-size: cover;
    margin-left: 5px;
    margin-right: 15px;
  `,
  CoinNameContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 55px;
    height: 45px;
  `,
  CoinName: styled.strong`
    display: block;
    font-size: 12px;
    font-weight: 800;
    @media ${({ theme }) => theme.tablet} {
      font-weight: 500;
    }
  `,
  CoinNameEn: styled.span`
    display: block;
    font-size: 12px;
  `,
  Price: styled.strong`
    display: block;
    width: 20%;
    min-width: 55px;
    height: 100%;
    text-align: right;
    line-height: 2.5rem;
    font-size: 12px;
    font-weight: 800;
    color: ${({ fontColor }) => fontColor};

    border: 1px solid transparent;
    ${({ isTraded }) =>
      isTraded &&
      (isTraded === "ASK"
        ? css`
            animation: disappearBlue 0.6s;
          `
        : css`
            animation: disappearRed 0.6s;
          `)};
    @keyframes disappearBlue {
      0% {
        border-color: ${({ theme }) => theme.strongBlue};
      }
      100% {
        border-color: ${({ theme }) => theme.strongBlue};
      }
    }
    @keyframes disappearRed {
      0% {
        border-color: ${({ theme }) => theme.strongRed};
      }
      100% {
        border-color: ${({ theme }) => theme.strongRed};
      }
    }

    @media ${({ theme }) => theme.tablet} {
      font-weight: 500;
    }
  `,
  ChangRateContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 55px;
    height: 100%;
    text-align: right;
  `,
  ChangeRate: styled.span`
    display: block;
    font-size: 12px;
    color: ${({ fontColor }) => fontColor};
    /* font-weight: 800; */
  `,
  ChangePrice: styled.span`
    display: block;
    font-size: 12px;
    color: ${({ fontColor }) => fontColor};
    /* font-weight: 800; */
  `,
  TradePrice: styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    width: 25%;
    height: 100%;
    text-align: right;
    /* font-weight: 800; */
  `,
};

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

  const tradeListData = useSelector(
    (state) => state.Coin.tradeList.data[marketName]
  );

  const nowTimestamp = +new Date();

  const isTraded =
    tradeListData &&
    tradeListData.length > 2 &&
    nowTimestamp - tradeListData[0].timestamp < 500 &&
    tradeListData[0].trade_price !== tradeListData[1].trade_price
      ? tradeListData[0].ask_bid
      : false;

  const changeMarket = useCallback(() => {
    dispatch(startChangeMarketAndData(marketName));
    history.push("/trade");
  }, [dispatch, marketName, history]);

  return (
    <St.CoinLi
      borderBottomColor={theme.lightGray}
      bgColor={selectedMarket === marketName ? theme.lightGray : "white"}
    >
      <St.CoinBtn onClick={changeMarket}>
        <St.CoinLogo
          coinNameEn={enCoinName.split("/")[0]}
          title={`${coinName} 로고`}
        />
        <St.CoinNameContainer>
          <St.CoinName theme={theme}>{coinName}</St.CoinName>
          <St.CoinNameEn>{enCoinName}</St.CoinNameEn>
        </St.CoinNameContainer>
        <St.Price theme={theme} fontColor={fontColor} isTraded={isTraded}>
          {price.toLocaleString()}
        </St.Price>
        <St.ChangRateContainer>
          <St.ChangeRate fontColor={fontColor}>
            {changeRate24Hour}
          </St.ChangeRate>
          <St.ChangePrice fontColor={fontColor}>
            {changePrice24Hour.toLocaleString()}
          </St.ChangePrice>
        </St.ChangRateContainer>
        <St.TradePrice>
          {tradePrice24Hour.toLocaleString() + " 백만"}
        </St.TradePrice>
      </St.CoinBtn>
    </St.CoinLi>
  );
};

export default React.memo(CoinListItem, isEqual);
