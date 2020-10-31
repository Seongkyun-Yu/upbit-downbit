const size = {
  mobile: "0px",
  tablet: "770px",
  desktop: "1280px",
};

const theme = {
  deepBlue: "#093687",
  skyBlue1: "rgba(0,98,223,.03)",
  skyBlue2: "rgba(0,98,223,.09)",
  lightPink1: "rgba(216,14,53,.03);",
  lightPink2: "rgba(216,14,53,.09);",
  strongRed: "#d80e35",
  priceUp: "rgb(210, 79, 69)",
  priceDown: "rgb(18, 97, 196)",
  priceUpTrans: "rgba(210, 79, 69, 0.5)",
  priceDownTrans: "rgba(18, 97, 196, 0.5)",
  middleGray: "#00000033",
  lightGray: "rgb(244, 245, 248)",
  lightGray1: "rgb(249, 250, 252)",
  lightGray2: "rgb(212, 214, 220)",
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
