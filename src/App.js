import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
import { useDispatch } from "react-redux";
import MainChart from "./Components/MainChart";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getMakretNames());
    // dispatch(getInitCanldes());
    dispatch(startInit());
  }, [dispatch]);
  return (
    <div className="App">
      안녕~
      <MainChart />
    </div>
  );
}

export default App;
