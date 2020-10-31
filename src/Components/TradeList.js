import React from "react";
import styled from "styled-components";
import TradeListItem from "./TradeListItem";
import Decimal from "decimal.js";
import moment from "moment-timezone";
import withTradeListData from "../Container/withTradeListData";

const Container = styled.article`
  width: 100%;
  height: 100%;
  background-color: white;
  margin-top: 10px;
`;

const TradeListUL = styled.ul`
  overflow-y: scroll;
  scrollbar-color: ${(props) => props.scrollColor};
  scrollbar-width: thin;
  scrollbar-base-color: ${(props) => props.scrollColor};
  &::-webkit-scrollbar {
    width: 5px;
    background-color: white;
    border-radius: 5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.scrollColor};
    border-radius: 5rem;
  }
  max-height: 310px;
`;

const TradeListTitle = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 25px;
  background-color: ${(props) => props.bgColor};
  font-size: 0.9rem;
`;

const TitleListItem = styled.li`
  width: 20%;
  text-align: ${(props) => props.textAlign || "center"};
`;

const TradeList = ({ theme, selectedTradeListData, selectedCoin }) => {
  return (
    <Container>
      <TradeListTitle bgColor={theme.lightGray1}>
        <TitleListItem textAlign={"center"}>체결시간</TitleListItem>
        <TitleListItem>체결가격</TitleListItem>
        <TitleListItem textAlign={"right"}>체결량</TitleListItem>
        <TitleListItem textAlign={"right"}>체결금액</TitleListItem>
      </TradeListTitle>
      <TradeListUL scrollColor={theme.middleGray}>
        {selectedTradeListData &&
          selectedTradeListData.map((tradeList, i) => {
            const tradeAmount = new Decimal(tradeList.trade_volume) + "";
            return (
              <TradeListItem
                theme={theme}
                index={i}
                key={`tradeList-${tradeList.sequential_id}`}
                date={moment(tradeList.timestamp).format("MM.DD")}
                time={moment(tradeList.timestamp).format("HH:mm")}
                tradePrice={tradeList.trade_price}
                changePrice={tradeList.change_price}
                tradeAmount={+tradeAmount}
                askBid={tradeList.ask_bid}
              />
            );
          })}
      </TradeListUL>
    </Container>
  );
};

export default withTradeListData()(React.memo(TradeList));
