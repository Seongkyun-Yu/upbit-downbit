import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
import { useDispatch } from "react-redux";
import MainChart from "./Components/MainChart";
import Main from "./Pages/Main";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);
  return (
    <div className="App">
      {/* <MainChart /> */}
      <Main />
    </div>
  );
}

export default App;
