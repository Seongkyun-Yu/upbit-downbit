const size = {
  mobile: "0px",
  tablet: "770px",
  desktop: "1024px",
};

const theme = {
  deepBlue: "#093687",
  skyBlue1: "rgba(0,98,223,.03)",
  skyBlue2: "rgba(0,98,223,.09)",
  lightPink1: "rgba(216,14,53,.03);",
  lightPink2: "rgba(216,14,53,.09);",
  priceUp: "rgb(210, 79, 69)",
  priceDown: "rgb(18, 97, 196)",
  priceUpTrans: "rgba(210, 79, 69, 0.5)",
  priceDownTrans: "rgba(18, 97, 196, 0.5)",
  middleGray: "#00000033",
  lightGray: "rgb(244, 245, 248)",
  lightGray2: "rgb(212, 214, 220)",
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
