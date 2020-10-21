import React from "react";
import styled from "styled-components";

const TradeListLi = styled.li`
  display: flex;
  width: 100%;
`;

const Datetime = styled.div`
  width: 20%;
`;
const Date = styled.span`
  text-align: center;
`;

const Time = styled.span`
  text-align: center;
`;

const TradePrice = styled.span`
  display: block;
  width: 30%;
  text-align: center;
`;

const TradeAmount = styled.span`
  display: block;
  width: 30%;
  text-align: center;
`;

const TradeKRW = styled.span`
  display: block;
  width: 30%;
  text-align: center;
`;

const TradeListItem = ({
  theme,
  date,
  time,
  tradePrice,
  tradeAmount,
  askBid,
}) => {
  return (
    <TradeListLi>
      <Datetime>
        <Date>{date}</Date>
        <Time>{time}</Time>
      </Datetime>
      <TradePrice>{tradePrice}</TradePrice>
      <TradeAmount>{+tradeAmount}</TradeAmount>
      <TradeKRW>{Math.floor(tradePrice * tradeAmount)}</TradeKRW>
    </TradeListLi>
  );
};

export default React.memo(TradeListItem);
