import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { startAddMoreCandleData } from "../../Reducer/coinReducer";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  mouseBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from "react-financial-charts";

import Loading from "../Global/Loading";

import withOHLCData from "../../Container/withOHLCData";
import withThemeData from "../../Container/withThemeData";
import withSelectedOption from "../../Container/withSelectedOption";
import withLoadingData from "../../Container/withLoadingData";
import isEqual from "react-fast-compare";

const barChartExtents = (data) => {
  return data.volume;
};

const candleChartExtents = (data) => {
  return [data.high, data.low];
};

const yEdgeIndicator = (data) => {
  return data.close;
};

const volumeSeries = (data) => {
  return data.volume;
};

const St = {
  ChartContainer: styled.section`
    width: 100%;
    height: 500px;
    background-color: white;
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
};

const margin = { left: 10, right: 80, top: 20, bottom: 20 };
const minHeight = 350;

const MainChart = ({
  data: initialData,
  height,
  width,
  ratio,
  selectedTimeType,
  theme,
  isCandleLoading,
}) => {
  if (height > 500) height = 500;
  const dispatch = useDispatch();

  const dateTimeFormat =
    selectedTimeType === "days" || selectedTimeType === "weeks"
      ? "%y-%m-%d"
      : "%y-%m-%d %H:%M";
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const pricesDisplayFormat = format("");

  const openCloseColor = (data) => {
    return data.close > data.open ? theme.priceUp : theme.priceDown;
  };

  const volumeColor = (data) => {
    return data.close > data.open ? theme.priceUpTrans : theme.priceDownTrans;
  };

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => d.date
  );

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => {
      d.ema12 = c;
    })
    .accessor((d) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor((d) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(initialData)));

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    calculatedData
  );

  // 확대 축소 초기 범위를 정하는 xExtendts설정, max와 min이 변하면 새로운 데이터 추가시 줌 설정이 풀린다
  const max = xAccessor(data[Math.min(199, data.length - 1)]);
  const min = xAccessor(
    data.length < 50 ? 0 : data[Math.min(50, Math.floor(data.length / 2))]
  );
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;

  return (
    <St.ChartContainer>
      <St.HiddenH3>캔들 차트</St.HiddenH3>
      {isCandleLoading ? (
        <Loading />
      ) : (
        <ChartCanvas
          height={height}
          ratio={ratio}
          width={width}
          margin={margin}
          data={data}
          displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          xExtents={xExtents}
          disableInteraction={false}
          zoomAnchor={mouseBasedZoomAnchor}
          onLoadBefore={() => {
            dispatch(startAddMoreCandleData());
          }}
        >
          <Chart
            id={2}
            height={barChartHeight}
            origin={barChartOrigin}
            yExtents={barChartExtents}
          >
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          </Chart>
          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis showGridLines showTickLabel={false} />
            <YAxis showGridLines tickFormat={pricesDisplayFormat} />
            <CandlestickSeries
              fill={openCloseColor}
              wickStroke={openCloseColor}
            />
            <LineSeries
              yAccessor={ema26.accessor()}
              strokeStyle={ema26.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries
              yAccessor={ema12.accessor()}
              strokeStyle={ema12.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              options={[
                {
                  yAccessor: ema26.accessor(),
                  type: "EMA",
                  stroke: ema26.stroke(),
                  windowSize: ema26.options().windowSize,
                },
                {
                  yAccessor: ema12.accessor(),
                  type: "EMA",
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize,
                },
              ]}
            />

            <ZoomButtons />
            <OHLCTooltip origin={[8, 16]} />
          </Chart>
          <Chart
            id={4}
            height={elderRayHeight}
            yExtents={[0, elder.accessor()]}
            origin={elderRayOrigin}
            padding={{ top: 8, bottom: 8 }}
          >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />

            <ElderRaySeries yAccessor={elder.accessor()} />

            <SingleValueTooltip
              yAccessor={elder.accessor()}
              yLabel="Elder Ray"
              yDisplayFormat={(d) =>
                `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                  d.bearPower
                )}`
              }
              origin={[8, 16]}
            />
          </Chart>
          <CrossHairCursor snapX={false} />
        </ChartCanvas>
      )}
    </St.ChartContainer>
  );
};

export default withOHLCData()(
  withSize({
    style: {
      width: "100%",
      height: "500",
      minHeight,
    },
  })(
    withDeviceRatio()(
      withSelectedOption()(
        withLoadingData()(withThemeData()(React.memo(MainChart, isEqual)))
      )
    )
  )
);
