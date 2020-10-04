import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
import { useDispatch } from "react-redux";
import Main from "./Pages/Main";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
