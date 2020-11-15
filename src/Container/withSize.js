import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

const withSize = () => (OriginalComponent) => (props) => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const [heightSize, setHeightSize] = useState(window.innerHeight);

  const handleSize = useCallback(() => {
    setWidthSize(window.innerWidth);
    setHeightSize(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", throttle(handleSize, 200));
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [handleSize]);

  return (
    <OriginalComponent
      {...props}
      widthSize={widthSize}
      heightSize={heightSize}
    />
  );
};

export default withSize;
