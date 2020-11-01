import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../Pages/Main";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  );
};

export default MainRouter;
