import React from "react";
import styled from "styled-components";
import { numWithComma } from "../Lib/utils";

const TradeListLi = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 25px;
  font-size: 0.9em;
  background-color: ${(props) => props.bgColor || "white"};
`;

const Datetime = styled.div`
  width: 20%;
  text-align: center;
`;
const Date = styled.span`
  text-align: center;
`;

const Time = styled.span`
  text-align: center;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const TradePrice = styled.span`
  display: block;
  width: 20%;
  text-align: center;
  color: ${(props) => props.fontColor};
  font-weight: 600;
`;

const TradeAmount = styled.span`
  display: block;
  width: 20%;
  text-align: right;
  color: ${(props) => props.fontColor};
`;

const TradeKRW = styled.span`
  display: block;
  width: 20%;
  text-align: right;
`;

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
    <TradeListLi bgColor={index % 2 ? theme.lightGray1 : "white"}>
      <Datetime>
        <Date>{date}</Date>
        <Time>{time}</Time>
      </Datetime>
      <TradePrice fontColor={changePrice > 0 ? theme.priceUp : theme.priceDown}>
        {numWithComma(tradePrice)}
      </TradePrice>
      <TradeAmount
        fontColor={askBid === "BID" ? theme.priceUp : theme.priceDown}
      >
        {tradeAmount.toFixed(5)}
      </TradeAmount>
      <TradeKRW>{numWithComma(Math.floor(tradePrice * tradeAmount))}</TradeKRW>
    </TradeListLi>
  );
};

export default React.memo(TradeListItem);
