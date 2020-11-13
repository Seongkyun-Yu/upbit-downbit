import React from "react";
import styled from "styled-components";

const St = {
  Container: styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
  `,
  TimeBtnContainer: styled.div`
    display: flex;
    align-items: center;
    height: 30px;
  `,
  TimeBtn: styled.button`
    /* width: 50px; */
    height: 20px;
    margin-left: 5px;
    font-size: 0.8rem;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.lightGray2};
    cursor: pointer;
  `,
};

const ChartDataConsole = ({ theme }) => {
  return (
    <St.Container theme={theme}>
      <St.TimeBtnContainer>
        <St.TimeBtn>1m</St.TimeBtn>
        <St.TimeBtn>3m</St.TimeBtn>
        <St.TimeBtn>5m</St.TimeBtn>
        <St.TimeBtn>10m</St.TimeBtn>
        <St.TimeBtn>60m</St.TimeBtn>
        <St.TimeBtn>240m</St.TimeBtn>
        <St.TimeBtn>1d</St.TimeBtn>
        <St.TimeBtn>1w</St.TimeBtn>
      </St.TimeBtnContainer>
    </St.Container>
  );
};

export default ChartDataConsole;
