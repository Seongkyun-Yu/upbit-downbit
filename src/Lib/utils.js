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
    default:
      return undefined;
  }
};

const candleDataUtils = {
  init: (candles, state) => {
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeType;

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
      data[candle.market]["accTradePrice"] = candle.acc_trade_price_24h;
      data[candle.market]["accTradeVolume"] = candle.acc_trade_volume_24h;
      data[candle.market]["changeRate"] = candle.signed_change_rate;
      data[candle.market]["cahnagePrice"] = candle.signed_change_price;
      data[candle.market]["highest52WeekPrice"] = candle.highest_52_week_price;
      data[candle.market]["highest52WeekDate"] = candle.highest_52_week_date;
      data[candle.market]["lowest52WeekPrice"] = candle.lowest_52_week_price;
      data[candle.market]["lowest52WeekDate"] = candle.lowest_52_week_date;
    });

    return data;
  },
  update: (candle, state) => {
    const candleStateDatas = state.Coin.candle.data;
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeType;

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

    const check = targetCandles.find((candle) => candle.datetime === datetime);

    const newData = { ...candleStateDatas };
    if (check) {
      const volume = check.volume + candle.trade_volume;
      const tradePrice = check.tradePrice + candle.trade_price;
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
      newData[coinMarket]["accTradePrice"] = candle.acc_trade_price_24h;
      newData[coinMarket]["accTradeVolume"] = candle.acc_trade_volume_24h;
      newData[coinMarket]["changeRate"] = candle.signed_change_rate;
      newData[coinMarket]["cahnagePrice"] = candle.signed_change_price;
      newData[coinMarket]["highest52WeekPrice"] = candle.highest_52_week_price;
      newData[coinMarket]["highest52WeekDate"] = candle.highest_52_week_date;
      newData[coinMarket]["lowest52WeekPrice"] = candle.lowest_52_week_price;
      newData[coinMarket]["lowest52WeekDate"] = candle.lowest_52_week_date;
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
      newData[coinMarket]["accTradePrice"] = candle.acc_trade_price_24h;
      newData[coinMarket]["accTradeVolume"] = candle.acc_trade_volume_24h;
      newData[coinMarket]["changeRate"] = candle.signed_change_rate;
      newData[coinMarket]["cahnagePrice"] = candle.signed_change_price;
      newData[coinMarket]["highest52WeekPrice"] = candle.highest_52_week_price;
      newData[coinMarket]["highest52WeekDate"] = candle.highest_52_week_date;
      newData[coinMarket]["lowest52WeekPrice"] = candle.lowest_52_week_price;
      newData[coinMarket]["lowest52WeekDate"] = candle.lowest_52_week_date;
    }

    return newData;
  },
  oneCoin: (candles, state) => {
    // console.log(state);
    const candleStateData = state.Coin.candle.data;
    const selectedTimeType = state.Coin.selectedTimeType;
    const selectedTimeCount = state.Coin.selectedTimeType;
    const market = candles[0].market;

    const newCandles = candles.map((candle) => {
      console.log(candle.candle_acc_trade_volume);
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

export { timestampToDatetime, candleDataUtils };
