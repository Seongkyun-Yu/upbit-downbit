import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useSelector } from "react-redux";

const MainChart = () => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  // const selectedCandles = useSelector(
  //   (state) => state.Coin.candle.data[selectedMarket].candles
  // );
  // console.log(test[0].date);

  const selectedCandles = fc.randomFinancial()(200);
  let updated = false;

  if (selectedCandles.length > 2) {
    let updated = true;

    // console.log("여기야", selectedCandles);
    const xExtent = fc.extentDate().accessors([(d) => d.date]);
    const yExtent = fc.extentLinear().accessors([(d) => d.high, (d) => d.low]);

    const gridlines = fc.annotationSvgGridline();

    const candlestick = fc.seriesSvgCandlestick().decorate((sel) => {
      sel.enter().style("fill", (_, i) => (_.open > _.close ? "blue" : "red"));
      sel
        .enter()
        .style("stroke", (_, i) => (_.open > _.close ? "blue" : "red"));
    });

    const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);
    // 줌용 설정
    const x = d3.scaleTime();
    const y = d3.scaleLinear();

    const x2 = d3.scaleTime();
    const y2 = d3.scaleLinear();

    const zoom = d3.zoom().on("zoom", () => {
      // update the scale used by the chart to use the updated domain

      x.domain(d3.event.transform.rescaleX(x2).domain());
      y.domain(d3.event.transform.rescaleY(y2).domain());
      d3.select(".chartContainer").datum(selectedCandles).call(chart);
    });
    const chart = fc
      .chartCartesian(x, y)
      .xDomain(xExtent(selectedCandles))
      .yDomain(yExtent(selectedCandles))
      .svgPlotArea(multi)
      .decorate((sel) => {
        sel
          .enter()
          .select(".plot-area")
          .on("measure.range", () => {
            x2.range([0, d3.event.detail.width]);
            y2.range([d3.event.detail.height, 0]);
          })
          .call(zoom);
      });

    x2.domain(chart.xDomain());
    y2.domain(chart.yDomain());

    d3.select(".chartContainer").datum(selectedCandles).call(chart);
  }

  useEffect(() => {}, [selectedCandles]);

  return (
    <div className="chartContainer">
      {/* <svg id="chartContainer" ref={svgRef}></svg> */}
    </div>
  );
};

export default MainChart;
