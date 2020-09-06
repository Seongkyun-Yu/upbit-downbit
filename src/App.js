import React, { useEffect } from "react";

import { getMakretNames } from "./Reducer/candleReducer";

function App() {
  useEffect(() => {
    getMakretNames();
  }, []);
  return <div className="App">안녕~</div>;
}

export default App;
