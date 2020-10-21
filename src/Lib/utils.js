import moment from "moment-timezone";
import * as d3 from "d3";

const dateFormat = d3.timeParse("%Y-%m-%d %H:%M");

const timestampToDatetime = (timeType, timeCount, timestamp) => {
  switch (timeType) {
    case "minute":
    case "minutes":
      return (
        moment(timestamp)
          .minute(
            Math.floor(moment(timestamp).minute() / timeCount) * timeCount
          )
          .second(0)
          // .tz("Asia/Seoul")
          .format("YYYY-MM-DD HH:mm")
      );
    case "hour":
    case "hours":
      return (
        moment(timestamp)
          .hour(Math.floor(moment(timestamp).hour() / timeCount) * timeCount)
          .minute(0)
          .second(0)
          // .tz("Asia/Seoul")
          .format("YYYY-MM-DD HH:mm")
      );
    case "day":
    case "days":
      return moment(timestamp)
        .hour(0)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DD HH:mm");
    default:
      return undefined;
  }
};

// 문자열 숫자에 천단위 콤마 찍기
const numWithComma = (num) => {
  const numStr = num + "";
  const numStrArr = numStr.split(".");
  const number = numStrArr[0];

  if (number.length <= 3) return num;

  const arr = [...numStrArr[0]];
  let counter = 1;
  while (true) {
    if (3 * counter >= numStr.length) break;
    arr.splice(-3 * counter - counter + 1, 0, ",");
    counter += 1;
  }
  if (arr[0] === ",") arr.shift();
  const dotAfter = numStrArr[1] ? "." + numStrArr[1] : "";
  return arr.join("") + dotAfter;
};

const candleDataUtils = {
  init: (candles, state) => {
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeCount;

    const data = {};
    candles.forEach((candle) => {
      data[candle.market] = {};
      data[candle.market]["candles"] = [];
      data[candle.market]["candles"].push({
        date: dateFormat(
          timestampToDatetime(
            selectedTimeType,
            selectedTimeCount,
            candle.timestamp
          )
        ),
        datetime: timestampToDatetime(
          selectedTimeType,
          selectedTimeCount,
          candle.timestamp
        ),
        timestamp: candle.timestamp,
        open: candle.opening_price,
        high: candle.high_price,
        low: candle.low_price,
        close: candle.trade_price,
        volume: candle.acc_trade_volume,
        tradePrice: candle.acc_trade_price,
      });
      data[candle.market]["tradePrice24Hour"] = candle.acc_trade_price_24h;
      data[candle.market]["volume24Hour"] = candle.acc_trade_volume_24h;
      data[candle.market]["changeRate24Hour"] = candle.signed_change_rate;
      data[candle.market]["changePrice24Hour"] = candle.signed_change_price;
      data[candle.market]["highestPrice24Hour"] = candle.high_price;
      data[candle.market]["lowestPrice24Hour"] = candle.low_price;
      data[candle.market]["highestPrice52Week"] = candle.highest_52_week_price;
      data[candle.market]["highestDate52Week"] = candle.highest_52_week_date;
      data[candle.market]["lowestPrice52Week"] = candle.lowest_52_week_price;
      data[candle.market]["lowestDate52Week"] = candle.lowest_52_week_date;
    });

    return data;
  },
  update: (candle, state) => {
    const candleStateDatas = state.Coin.candle.data;
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeCount;

    const coinMarket = candle.code;

    const targetCandles = candleStateDatas[coinMarket].candles;
    const lastCandle = targetCandles.slice(-1)[0];

    const date = dateFormat(
      timestampToDatetime(selectedTimeType, selectedTimeCount, candle.timestamp)
    );
    const datetime = timestampToDatetime(
      selectedTimeType,
      selectedTimeCount,
      candle.timestamp
    );
    const open = lastCandle.open;
    const high =
      candle.trade_price > lastCandle.high
        ? candle.trade_price
        : lastCandle.high;
    const low =
      candle.trade_price < lastCandle.low ? candle.trade_price : lastCandle.low;
    const close = candle.trade_price;

    const highestPrice24Hour = candleStateDatas[coinMarket].highestPrice24Hour;
    const lowestPrice24Hour = candleStateDatas[coinMarket].lowestPrice24Hour;

    const needUpdate = targetCandles.find(
      (candle) => candle.datetime === datetime
    );
    const dateChanged =
      d3.timeParse("YYYY-MM-DD")(lastCandle.date) !==
      d3.timeParse("YYYY-MM-DD")(datetime);

    const newData = { ...candleStateDatas };
    if (needUpdate) {
      const volume = needUpdate.volume + candle.trade_volume;
      const tradePrice = needUpdate.tradePrice + candle.trade_price;
      const updatedCandles = [...targetCandles];
      updatedCandles.pop();
      updatedCandles.push({
        date,
        datetime,
        timestamp: candle.timestamp,
        open,
        high,
        low,
        close,
        volume,
        tradePrice,
      });

      newData[coinMarket]["candles"] = updatedCandles;
      newData[coinMarket]["tradePrice24Hour"] = candle.acc_trade_price_24h;
      newData[coinMarket]["volume24Hour"] = candle.acc_trade_volume_24h;
      newData[coinMarket]["changeRate24Hour"] = candle.signed_change_rate;
      newData[coinMarket]["changePrice24Hour"] = candle.signed_change_price;
      newData[coinMarket]["highestPrice24Hour"] =
        high > highestPrice24Hour ? high : highestPrice24Hour;
      newData[coinMarket]["lowestPrice24Hour"] =
        low < lowestPrice24Hour ? low : lowestPrice24Hour;
      newData[coinMarket]["highestPrice52Week"] = candle.highest_52_week_price;
      newData[coinMarket]["highestDate52Week"] = candle.highest_52_week_date;
      newData[coinMarket]["lowestPrice52Week"] = candle.lowest_52_week_price;
      newData[coinMarket]["lowestDate52Week"] = candle.lowest_52_week_date;
    } else {
      const volume = candle.trade_volume;
      const tradePrice = candle.trade_price;

      newData[coinMarket]["candles"] = [
        ...targetCandles,
        {
          date,
          datetime,
          timestamp: candle.timestamp,
          dateKst: candle.trade_date_kst,
          timeKst: candle.trade_time_kst,
          open: close,
          high: close,
          low: close,
          close,
          volume,
          tradePrice,
        },
      ];
      newData[coinMarket]["tradePrice24Hour"] = candle.acc_trade_price_24h;
      newData[coinMarket]["volume24Hour"] = candle.acc_trade_volume_24h;
      newData[coinMarket]["changeRate24Hour"] = candle.signed_change_rate;
      newData[coinMarket]["changePrice24Hour"] = candle.signed_change_price;
      newData[coinMarket]["highestPrice24Hour"] = dateChanged // 날짜가 바뀌지 않았을때만 고점 갱신기록, 날짜 바뀌면 지금 고점 기록
        ? high
        : high > highestPrice24Hour
        ? high
        : highestPrice24Hour;
      newData[coinMarket]["lowestPrice24Hour"] = dateChanged
        ? low
        : low < lowestPrice24Hour
        ? low
        : lowestPrice24Hour;
      newData[coinMarket]["highestPrice52Week"] = candle.highest_52_week_price;
      newData[coinMarket]["highestDate52Week"] = candle.highest_52_week_date;
      newData[coinMarket]["lowestPrice52Week"] = candle.lowest_52_week_price;
      newData[coinMarket]["lowestDate52Week"] = candle.lowest_52_week_date;
    }

    return newData;
  },
  oneCoin: (candles, state) => {
    const candleStateData = state.Coin.candle.data;
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeCount;
    const market = candles[0].market;

    const newCandles = candles.map((candle) => {
      return {
        date: dateFormat(
          timestampToDatetime(
            selectedTimeType,
            selectedTimeCount,
            candle.timestamp
          )
        ),
        datetime: timestampToDatetime(
          selectedTimeType,
          selectedTimeCount,
          candle.timestamp
        ),
        timestamp: candle.timestamp,
        open: candle.opening_price,
        high: candle.high_price,
        low: candle.low_price,
        close: candle.trade_price,
        volume: candle.candle_acc_trade_volume,
        tradePrice: candle.candle_acc_trade_price,
      };
    });

    const newData = {
      ...candleStateData,
      [market]: {
        ...candleStateData[market],
        candles: newCandles,
      },
    };

    return newData;
  },
  marketNames: (names) => {
    const data = {};
    names.forEach((name) => {
      if (name.market.split("-")[0] !== "KRW") return;
      data[name.market] = name.korean_name;
    });

    return data;
  },
};

const orderbookUtils = {
  init: (orderbooks, _) => {
    const data = {};
    orderbooks.forEach((orderbook) => {
      data[orderbook.market] = {
        ...orderbook,
        code: orderbook.market,
      };
    });

    return data;
  },
  update: (orderbook, state) => {
    const orderbookData = state.Coin.orderbook.data;
    const market = orderbook.code;
    return {
      ...orderbookData,
      [market]: {
        ...orderbook,
        market,
      },
    };
  },
};

const tradeListUtils = {
  init: (tradeLists, state) => {
    const tradeListData = state.Coin.tradeList.data;
    const market = tradeLists[0].market;
    return {
      ...tradeListData,
      [market]: tradeLists,
    };
  },
  update: (tradeList, state) => {
    const tradeListData = state.Coin.tradeList.data;
    const market = tradeList.code;
    if (
      tradeListData[market] &&
      tradeListData[market].find(
        (data) => data.sequential_id === tradeList.sequential_id
      )
    )
      return tradeListData;
    tradeListData[market] && tradeListData[market].pop();
    return tradeListData[market]
      ? {
          ...tradeListData,
          [market]: [tradeList, ...tradeListData[market]],
        }
      : {
          ...tradeListData,
          [market]: [tradeList],
        };
  },
};

export {
  timestampToDatetime,
  numWithComma,
  candleDataUtils,
  orderbookUtils,
  tradeListUtils,
};
