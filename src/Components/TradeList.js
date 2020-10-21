import React from "react";
import styled from "styled-components";
import TradeListItem from "./TradeListItem";
import Decimal from "decimal.js";
import moment from "moment-timezone";
import withTradeListData from "../Container/withTradeListData";

const Container = styled.article`
  width: 100%;
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
  max-height: 250px;
`;

const TradeList = ({ theme, selectedTradeListData }) => {
  return (
    <Container>
      <TradeListUL scrollColor={theme.middleGray}>
        {selectedTradeListData &&
          selectedTradeListData.map((tradeList) => {
            return (
              <TradeListItem
                theme={theme}
                date={moment(tradeList.timestamp).format("MM.DD")}
                time={moment(tradeList.timestamp).format("HH:mm")}
                tradePrice={tradeList.trade_price}
                changePrice={tradeList.change_price}
                tradeAmount={+new Decimal(tradeList.trade_volume)}
                askBid={tradeList.ask_bid}
                key={`tradeList-${tradeList.sequential_id}`}
              />
            );
          })}
      </TradeListUL>
    </Container>
  );
};

export default withTradeListData()(React.memo(TradeList));
