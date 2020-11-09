import React from "react";
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
  lastVisibleItemBasedZoomAnchor,
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
import withOHLCData from "../Container/withOHLCData";
import styled from "styled-components";
import withThemeData from "../Container/withThemeData";
import withSelectedOption from "../Container/withSelectedOption";

const barChartExtents = (data) => {
  return data.volume;
};

const candleChartExtents = (data) => {
  return [data.high, data.low];
};

const yExtentsCalculator = ({ plotData }) => {
  console.log(plotData);
  let min = 0;
  let max = 0;

  // datas.forEach(({ low, high }) => {
  //   if (min === undefined) {
  //     min = low;
  //   }
  //   if (max === undefined) {
  //     max = high;
  //   }

  //   if (low !== undefined) {
  //     if (min > low) {
  //       min = low;
  //     }
  //   }

  //   if (high !== undefined) {
  //     if (max < high) {
  //       max = high;
  //     }
  //   }
  // });

  for (const { low, high } of plotData) {
    if (min === undefined) {
      min = low;
    }
    if (max === undefined) {
      max = high;
    }

    if (low !== undefined) {
      if (min > low) {
        min = low;
      }
    }

    if (high !== undefined) {
      if (max < high) {
        max = high;
      }
    }
  }

  if (min === undefined) {
    min = 0;
  }

  if (max === undefined) {
    max = 0;
  }

  const padding = (max - min) * 0.1;

  return [min - padding, max + padding * 2];
};

const yEdgeIndicator = (data) => {
  return data.close;
};

const volumeSeries = (data) => {
  return data.volume;
};

const ChartContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const margin = { left: 10, right: 80, top: 20, bottom: 20 };
const minHeight = 350;

const MainChart = ({
  data: initialData,
  height,
  width,
  ratio,
  selectedTimeType,
  theme,
}) => {
  // console.log(height, width);
  // if (height > 500) height = 500;
  // // if (width > 1000) width = 1000;
  // width = width / 2;

  const dateTimeFormat =
    selectedTimeType === "day" ? "%y-%m-%d" : "%y-%m-%d %H:%M";
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

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;

  return (
    <ChartContainer>
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
        onLoadBefore={() => console.log("럴수럴수")}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart
          id={3}
          height={chartHeight}
          yExtents={candleChartExtents}
          // yExtentsCalculator={yExtentsCalculator}
        >
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
    </ChartContainer>
  );
};

export default React.memo(
  withOHLCData()(
    React.memo(
      withSize({
        style: {
          width: "100%",
          height: "100%",
          minHeight,
        },
      })(
        React.memo(
          withDeviceRatio()(
            React.memo(
              withSelectedOption()(
                React.memo(withThemeData()(React.memo(MainChart)))
              )
            )
          )
        )
      )
    )
  )
);
