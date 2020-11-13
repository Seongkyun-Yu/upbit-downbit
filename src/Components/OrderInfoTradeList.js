import React from "react";
import styled from "styled-components";

const St = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 212px;
    background-color: white;
    font-size: 0.8rem;
    color: #666;
  `,
};

const OrderInfoTradeList = ({ theme }) => {
  return <St.Container>로그인 후 사용 가능합니다.</St.Container>;
};

export default React.memo(OrderInfoTradeList);
