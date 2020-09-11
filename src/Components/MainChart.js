import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

const MainChart = () => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const selectedCandles = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].candles
  );
  const dateFormat = d3.timeParse("%Y-%m-%d %H:%M");

  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 15, right: 65, bottom: 205, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 625 - margin.top - margin.bottom;

    const svg = d3
      .select("#chartContainer")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const dates = selectedCandles.map((candle) => dateFormat(candle.datetime));
    console.log();

    const xScale = d3
      .scaleLinear()
      .domain([-1, dates.length])
      .range([0, width]);

    const xDateScale = d3
      .scaleQuantize()
      .domain([0, dates.length])
      .range(dates.length ? dates : ["20-01-01 00:00"]);

    const xBand = d3
      .scaleBand()
      .domain(d3.range(-1, dates.length))
      .range([0, width])
      .padding(0.3);

    const xAxis = d3.axisBottom().scale(xScale);

    svg
      .append("rect")
      .attr("id", "rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("clip-path", "url(#clip)");

    let gX = svg
      .append("g")
      .attr("class", "axis x-axis") //Assign "axis" class
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    gX.selectAll(".tick text");

    const ymin = d3.min(selectedCandles.map((candle) => candle.low));
    const ymax = d3.max(selectedCandles.map((candle) => candle.low));
    const yScale = d3
      .scaleLinear()
      .domain([ymin, ymax])
      .range([height, 0])
      .nice();
    const yAxis = d3.axisLeft().scale(yScale);

    const gY = svg.append("g").attr("class", "axis y-axis").call(yAxis);

    const chartBody = svg
      .append("g")
      .attr("class", "chartBody")
      .attr("clip-path", "url(#clip)");

    // 캔들 몸통
    const candles = chartBody
      .selectAll(".candle")
      .data(selectedCandles)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i) - xBand.bandwidth())
      .attr("class", "candle")
      .attr("y", (candle) => yScale(Math.max(candle.open, candle.close)))
      .attr("width", xBand.bandwidth())
      .attr("height", (candle) => {
        return candle.open === candle.close
          ? 1
          : yScale(Math.min(candle.open, candle.close)) -
              yScale(Math.max(candle.open, candle.close));
      })
      .attr("fill", (candle) => {
        return candle.open === candle.close
          ? "silver"
          : candle.open > candle.close
          ? "red"
          : "green";
      });

    // 윗꼬리 아랫꼬리
    const stems = chartBody
      .selectAll("g.line")
      .data(selectedCandles)
      .enter()
      .append("line")
      .attr("class", "stem")
      .attr("x1", (_, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr("x2", (_, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr("y1", (candle) => yScale(candle.high))
      .attr("y2", (candle) => yScale(candle.low))
      .attr("stroke", (candle) => {
        return candle.open === candle.close
          ? "white"
          : candle.open > candle.close
          ? "red"
          : "green";
      });

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);
  }, [selectedCandles]);

  return <svg id="chartContainer" ref={svgRef}></svg>;
};

export default MainChart;
