import { React, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { LoginForm } from './LoginForm';
import { SignupForm } from './signUpForm';
import { motion } from 'framer-motion';
import { AccountContext } from '../components/accountContect.jsx';
import { useLocation } from 'react-router-dom';

export const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;


const float = keyframes`
  0%, 100% {
    transform: rotate(60deg) translateY(0) scale(1);
  }
  50% {
    transform: rotate(60deg) translateY(-15px) scale(1.05);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const BackDrop = styled(motion.div)`
  position: absolute;
  width: 160%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -260px;
  left: -70px;
  background: #283048;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #859398, #283048);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #859398, #283048); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-size: 200% 200%;
  animation: 
    ${gradientShift} 6s ease infinite,
    ${float} 2s ease-in-out infinite;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.div`
  font-size: 32px;          /* slightly larger for better impact */
  font-weight: 800;         /* bolder */
  background: linear-gradient(70deg,rgba(6, 100, 95, 0.6),rgb(67, 228, 193));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1.5px 1.5px 3px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.04em;
  margin-bottom: 6px;
  user-select: none;
  line-height: 1.3;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 10;
`;

export const SmallText = styled.div`
  font-size: 16px;           /* increased size for readability */
  font-weight: 700;          /* a bit bolder */
  background: linear-gradient(20deg,rgba(2, 2, 2, 0.74),rgb(14, 83, 83));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.12);
  letter-spacing: 0.06em;
  user-select: none;
  margin-top: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 10;
`;



export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

export const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)"
  }
}

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
}

export default function AccountBox() {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  useEffect(() => {
    if (location.pathname === "/signup") {
      setActive("signup");
    } else {
      setActive("signin");
    }
  }, [location.pathname]);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome to</HeaderText>
              <HeaderText>FRS</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" ? <LoginForm /> : <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}