import React from "react";
import styled from "styled-components";
import isEqual from "react-fast-compare";

const St = {
  TradeListLi: styled.li`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 25px;
    font-size: 0.9em;
    background-color: ${({ bgColor }) => bgColor || "white"};
  `,

  Datetime: styled.div`
    width: 20%;
    text-align: center;
    @media ${({ theme }) => theme.mobileS} {
      display: none;
    }
  `,
  Date: styled.span`
    text-align: center;
  `,

  Time: styled.span`
    text-align: center;
    font-size: 0.8rem;
    margin-left: 5px;
  `,

  TradePrice: styled.span`
    display: block;
    width: 20%;
    text-align: center;
    color: ${({ fontColor }) => fontColor};
    font-weight: 600;

    @media ${({ theme }) => theme.mobileS} {
      width: 50%;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.mobileM} {
      /* width: 50%; */
      font-size: 0.8rem;
    }
  `,

  TradeAmount: styled.span`
    display: block;
    width: 20%;
    text-align: center;
    color: ${({ fontColor }) => fontColor};

    @media ${({ theme }) => theme.mobileS} {
      width: 50%;
      font-size: 0.7rem;
    }

    @media ${({ theme }) => theme.mobileM} {
      /* width: 50%; */
      font-size: 0.8rem;
    }
  `,

  TradeKRW: styled.span`
    display: block;
    width: 20%;
    text-align: right;

    @media ${({ theme }) => theme.mobileS} {
      display: none;
    }

    @media ${({ theme }) => theme.mobileM} {
      display: none;
    }
  `,
};

const TradeListItem = ({
  theme,
  index,
  date,
  time,
  tradePrice,
  changePrice,
  tradeAmount,
  askBid,
}) => {
  return (
    <St.TradeListLi
      bgColor={index % 2 ? theme.lightGray1 : "white"}
      index={index}
    >
      <St.Datetime>
        <St.Date>{date}</St.Date>
        <St.Time>{time}</St.Time>
      </St.Datetime>
      <St.TradePrice
        fontColor={changePrice > 0 ? theme.priceUp : theme.priceDown}
      >
        {tradePrice.toLocaleString()}
      </St.TradePrice>
      <St.TradeAmount
        theme={theme}
        fontColor={askBid === "BID" ? theme.priceUp : theme.priceDown}
      >
        {tradeAmount.toFixed(5)}
      </St.TradeAmount>
      <St.TradeKRW theme={theme}>
        {Math.floor(tradePrice * tradeAmount).toLocaleString()}
      </St.TradeKRW>
    </St.TradeListLi>
  );
};

export default React.memo(TradeListItem, isEqual);
