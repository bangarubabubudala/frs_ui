import React from "react";
import "./styles.css";
import styled from "styled-components";
import AccountBox from "./components"; // make sure this is the AccountBox file
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Routes>
          <Route path="/login" element={<AccountBox />} />
          <Route path="/signup" element={<AccountBox />} />
          <Route path="/actionPage" element={<ActionPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}
