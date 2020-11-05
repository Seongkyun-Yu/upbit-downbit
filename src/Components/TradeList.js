import React from "react";
import styled from "styled-components";
import TradeListItem from "./TradeListItem";
import Decimal from "decimal.js";
import moment from "moment-timezone";
import withTradeListData from "../Container/withTradeListData";

const St = {
  Container: styled.article`
    width: 100%;
    height: 100%;
    background-color: white;
    margin-top: 10px;
  `,

  TradeListUL: styled.ul`
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
  `,

  TradeListTitle: styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 25px;
    background-color: ${({ theme }) => theme.lightGray1};
    font-size: 0.9rem;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.6rem;
    }
  `,

  TitleListItem: styled.li`
    width: 20%;
    text-align: ${({ textAlign }) => textAlign || "center"};
    @media ${({ theme, mobileSNone }) => (mobileSNone ? theme.mobileS : true)} {
      display: none;
    }

    @media ${({ theme, mobileMNone }) => (mobileMNone ? theme.mobileM : true)} {
      display: none;
    }

    @media ${({ theme, mobileSNone }) => mobileSNone || theme.mobileS} {
      width: 50%;
    }
  `,
};

const TradeList = ({ theme, selectedTradeListData }) => {
  return (
    <St.Container>
      <St.TradeListTitle bgColor={theme.lightGray1}>
        <St.TitleListItem mobileSNone={true} textAlign={"center"}>
          체결시간
        </St.TitleListItem>
        <St.TitleListItem>체결가격</St.TitleListItem>
        <St.TitleListItem>체결량</St.TitleListItem>
        <St.TitleListItem mobileMNone={true} textAlign={"right"}>
          체결금액
        </St.TitleListItem>
      </St.TradeListTitle>
      <St.TradeListUL scrollColor={theme.middleGray}>
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
      </St.TradeListUL>
    </St.Container>
  );
};

export default withTradeListData()(React.memo(TradeList));
