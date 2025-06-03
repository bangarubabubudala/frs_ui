import React, { useEffect } from "react";
import "./styles.css";
import styled from "styled-components";
import AccountBox from "./components"; // make sure this is the AccountBox file
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ActionPage } from "./components/ActionPage";
import Loader from "./components/Loader";
import { store, useSelector } from "./store";
import moment from "moment-timezone"
import AppIdleTimer from "./AppIdleTimer";
import { LOGOUT } from "./store/actions";
import axios from "axios";
import Swal from "sweetalert2";
import { LOGIN_PAGE_URL } from "./components/AjaxURLs";
import { useNotification } from "./UTILS/NotificationContext";

const { showNotification } = useNotification();

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


axios.interceptors.request.use(config => {
  const token = "Bearer" + ' ' + localStorage.getItem('token');
  config.headers.Authorization = token;
  config.headers["X-POSITION-ID"] = localStorage.getItem("positionId")
  config.headers["X-LOGIN-TYPE"] = localStorage.getItem("loginType")
  return config;
},
  function (error) {
    //failureResponse(error)
    if (error?.response?.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch({ type: LOGOUT })
          window.location.href = LOGIN_PAGE_URL
        }
      })
    } else if (error?.response?.status === 500) {
      showNotification("error", "Something went wrong. Please try again");
    }
    return Promise.reject(error);
  });

axios.interceptors.response.use(async (config) => {
  return config;
}, function (error) {
  if (error?.response?.status === 401) {
    Swal.fire({
      icon: 'error',
      title: 'Session Expired',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        store.dispatch({ type: LOGOUT })
        window.location.href = LOGIN_PAGE_URL
      }
    })
  } else if (error?.response?.status === 500) {
    showNotification("error", "Something went wrong. Please try again");
  }
  //failureResponse(error)
  return Promise.reject(error);
});


export default function App() {

  const { showNotification } = useNotification();
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
      <AppIdleTimer />
    </AppContainer>
  );
}
