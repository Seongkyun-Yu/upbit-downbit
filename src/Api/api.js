import axios from "axios";

export const coinApi = {
  getMarketCodes: () =>
    axios.get("https://api.upbit.com/v1/market/all?isDetails=false"),
  getInitCanldes: (coins) =>
    axios.get(`https://api.upbit.com/v1/ticker?markets=${coins}`),
  getInitOrderbooks: (coins) =>
    axios.get(`https://api.upbit.com/v1/orderbook?markets=${coins}`),
  getOneCoinCandles: ({ coin, timeType, timeCount }) => {
    if (timeType === "minutes")
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
    else
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}?market=${coin}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
  },
  getAdditionalCoinCandles: ({ coin, timeType, timeCount, datetime }) => {
    if (timeType === "minutes")
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&to=${datetime}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
    else
      return axios
        .get(
          `https://api.upbit.com/v1/candles/${timeType}?market=${coin}&to=${datetime}&count=200`
        )
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a, b) => a.timestamp - b.timestamp),
          };
        });
  },
  getOneCoinTradeLists: (coin) =>
    axios.get(`https://api.upbit.com/v1/trades/ticks?market=${coin}&count=50`),
};
