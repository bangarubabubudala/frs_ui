import React from "react";
import "./styles.css";
import styled from "styled-components";
import AccountBox from "./components"; // make sure this is the AccountBox file
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ActionPage } from "./components/ActionPage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path={["/login", "/signup"]} component={AccountBox} />
          <Route path="/actionPage" component={ActionPage} />
          <Route render={() => <Redirect to="/login" />} /> {/* fallback */}
        </Switch>
      </Router>
    </AppContainer>
  );
}
