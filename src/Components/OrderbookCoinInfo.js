import React from "react";
import styled from "styled-components";

const CandleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 33.33%;
  border: 1px solid gray;
  margin-top: -1px;
  /* margin-left: -1px; */
`;

const InfoContainer = styled.div`
  display: flex;
  width: 90%;
  font-size: 0.8rem;
  padding: 5px;
`;

const InfoTxt = styled.span`
  display: block;
  width: 50%;
`;

const InfoValue = styled.span`
  display: block;
  width: 50%;
  text-align: right;
`;

const OrderbookCoinInfo = ({
  volume24,
  tradePrice24,
  highest52WeekPrice,
  highest52WeekDate,
  lowest52WeekPrice,
  lowest52WeekDate,
}) => {
  return (
    <CandleInfoContainer>
      <InfoContainer>
        <InfoTxt>거래량</InfoTxt>
        <InfoValue>{volume24}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTxt>거래대금</InfoTxt>
        <InfoValue>{`${tradePrice24}백만`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTxt>52주 최고</InfoTxt>
        <InfoValue>{`${highest52WeekPrice} (${highest52WeekDate})`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTxt>52주 최저</InfoTxt>
        <InfoValue>{`${lowest52WeekPrice} (${lowest52WeekDate})`}</InfoValue>
      </InfoContainer>
    </CandleInfoContainer>
  );
};

export default React.memo(OrderbookCoinInfo);
