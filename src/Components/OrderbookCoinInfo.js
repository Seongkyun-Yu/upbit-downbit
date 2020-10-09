import React from "react";
import styled from "styled-components";

const CandleInfoContainer = styled.div`
  width: 33.33%;
  background-color: skyblue;
`;

const InfoContainer = styled.div``;
const InfoTxt = styled.span``;
const InfoValue = styled.span``;

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
    </CandleInfoContainer>
  );
};

export default React.memo(OrderbookCoinInfo);
