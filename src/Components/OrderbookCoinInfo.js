import React from "react";
import styled from "styled-components";

const St = {
  CandleInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 33.3333%;
    border: 1px solid gray;
    margin-top: -1px;
    margin-left: -1px;
  `,

  InfoContainer: styled.div`
    display: flex;
    width: 90%;
    font-size: 0.8rem;
    padding: 5px;
  `,

  InfoTxt: styled.span`
    display: block;
    width: 50%;
  `,

  InfoValue: styled.span`
    display: block;
    width: 50%;
    text-align: right;
  `,
};

const OrderbookCoinInfo = ({
  volume24,
  tradePrice24,
  highestPrice52Week,
  highestDate52Week,
  lowestPrice52Week,
  lowestDate52Week,
}) => {
  return (
    <St.CandleInfoContainer>
      <St.InfoContainer>
        <St.InfoTxt>거래량</St.InfoTxt>
        <St.InfoValue>{volume24}</St.InfoValue>
      </St.InfoContainer>
      <St.InfoContainer>
        <St.InfoTxt>거래대금</St.InfoTxt>
        <St.InfoValue>{`${tradePrice24}백만`}</St.InfoValue>
      </St.InfoContainer>
      <St.InfoContainer>
        <St.InfoTxt>52주 최고</St.InfoTxt>
        <St.InfoValue>{`${highestPrice52Week} (${highestDate52Week})`}</St.InfoValue>
      </St.InfoContainer>
      <St.InfoContainer>
        <St.InfoTxt>52주 최저</St.InfoTxt>
        <St.InfoValue>{`${lowestPrice52Week} (${lowestDate52Week})`}</St.InfoValue>
      </St.InfoContainer>
    </St.CandleInfoContainer>
  );
};

export default React.memo(OrderbookCoinInfo);
