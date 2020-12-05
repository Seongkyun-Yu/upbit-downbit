import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import withSelectedOption from "../../Container/withSelectedOption";
import withThemeData from "../../Container/withThemeData";
import { changeTimeTypeAndData } from "../../Reducer/coinReducer";

const St = {
  Container: styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
  `,
  HiddenH3: styled.h3`
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0);
    clip-path: polygon(0, 0);
    overflow: hidden;
    text-indent: -9999px;
  `,
  TimeBtnContainer: styled.div`
    display: flex;
    align-items: center;
    height: 30px;
  `,
  TimeBtn: styled.button`
    /* width: 50px; */
    height: 20px;
    width: 38px;
    margin-left: 5px;
    font-size: 0.8rem;
    background-color: white;

    border: ${({ theme, isSelected }) =>
      isSelected ? `2px solid black` : `1px solid ${theme.lightGray2}`};
    outline: none;
    cursor: pointer;
  `,
};

const ChartDataConsole = ({ theme, selectedTimeCount, selectedTimeType }) => {
  const dispatch = useDispatch();

  const changeChartTime = useCallback(
    (timeCount, timeType) => () => {
      dispatch(changeTimeTypeAndData({ timeCount, timeType }));
    },
    [dispatch]
  );

  return (
    <St.Container theme={theme}>
      <St.HiddenH3>차트에 표시할 캔들의 시간 선택</St.HiddenH3>
      <St.TimeBtnContainer>
        <St.TimeBtn
          onClick={changeChartTime(1, "minutes")}
          isSelected={selectedTimeCount === 1 && selectedTimeType === "minutes"}
        >
          1m
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(3, "minutes")}
          isSelected={selectedTimeCount === 3 && selectedTimeType === "minutes"}
        >
          3m
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(5, "minutes")}
          isSelected={selectedTimeCount === 5 && selectedTimeType === "minutes"}
        >
          5m
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(10, "minutes")}
          isSelected={
            selectedTimeCount === 10 && selectedTimeType === "minutes"
          }
        >
          10m
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(15, "minutes")}
          isSelected={
            selectedTimeCount === 15 && selectedTimeType === "minutes"
          }
        >
          15m
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(60, "minutes")}
          isSelected={
            selectedTimeCount === 60 && selectedTimeType === "minutes"
          }
        >
          1h
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(240, "minutes")}
          isSelected={
            selectedTimeCount === 240 && selectedTimeType === "minutes"
          }
        >
          4h
        </St.TimeBtn>
        <St.TimeBtn
          onClick={changeChartTime(1, "days")}
          isSelected={selectedTimeCount === 1 && selectedTimeType === "days"}
        >
          1d
        </St.TimeBtn>
      </St.TimeBtnContainer>
    </St.Container>
  );
};

export default withSelectedOption()(withThemeData()(ChartDataConsole));
