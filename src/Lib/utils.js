import moment from "moment-timezone";

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
          .tz("Asia/Seoul")
          // .format('YY-MM-DD HH:mm');
          .format()
      );
    case "hour":
    case "hours":
      return moment(timestamp)
        .hour(Math.floor(moment(timestamp).hour() / timeCount) * timeCount)
        .minute(0)
        .second(0)
        .tz("Asia/Seoul")
        .format("YY-MM-DD HH:mm");
    default:
      return undefined;
  }
};

export { timestampToDatetime };
