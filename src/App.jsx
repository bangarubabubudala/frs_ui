import React, { useEffect } from "react";
import "./styles.css";
import styled from "styled-components";
import AccountBox from "./components"; // make sure this is the AccountBox file
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ActionPage } from "./components/ActionPage";
import Loader from "./components/Loader";
import { useSelector } from "./store";
import moment from "moment-timezone"

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {

  const account = useSelector(state => state?.account)
  const MINUTE_MS = 30000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (account?.sessionDate !== null) {
        let sessionTime = account?.sessionDate
        let currentTime = new Date();
        let localSessionTime = moment(sessionTime).tz('GMT');
        let currentSessionTime = moment(currentTime).tz('GMT');
        console.log("localSessionTime.isBefore(currentSessionTime)", localSessionTime.isBefore(currentSessionTime))
        // if (localSessionTime.isBefore(currentSessionTime)) {
        //   refreshToken()
        // }
      }
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [account?.sessionDate])
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/login" element={<AccountBox />} />
          <Route path="/signup" element={<AccountBox />} />
          <Route path="/actionPage" element={<ActionPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <Loader />
    </AppContainer>
  );
}
