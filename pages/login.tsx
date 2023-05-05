import { useState } from "react";
import {
  Wrapper,
  Layout,
  VefskolinnLogo,
  InputForm,
  LogInput,
  InputWrapper,
  InputLabel,
  LoginButton,
  CreateAccountButton,
  Btnwrapper,
} from "../components/loginForm/loginForm.styles";
import styled from "styled-components";
import { motion } from "framer-motion";

const SvgPath = styled.svg`
  width: 100%;
  height: 100%;
  /* stroke: #7849DD;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round; */
  position: absolute;
  z-index: -1;

  @media screen and (min-width: 1540px) {
    width: calc(100% + 900px);
    margin-left: -500px;
  }
`;

const login = () => {
  const [authSwitch, setAuthSwitch] = useState(true);

  const handleAuthSwitch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAuthSwitch(!authSwitch);
  };

  return (
    <>
      <SvgPath
        width="100%"
        height="100vh"
        viewBox="180 0 1000 690"
        // viewBox="130 30 1200 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1269 67.4999C1345.42 49.5488 1374 -33.5001 1450.5 16.9999L1440 810.5H4.50005C-81.3333 641.5 -182.9 261.1 -26.5 247.5C169 230.5 204 365.5 372 403C540 440.5 1013.5 242.5 1060.5 189.5C1107.5 136.5 1120 102.5 1269 67.4999Z"
          fill="url(#paint0_linear_397_3379)"
        />
        <path
          d="M334.5 225.5C206.5 151.5 212.3 24.1 -2.5 18.5V813H1450.5C1452.83 759 1480.6 730.1 1475 704.5C1468 672.5 1367.5 571 1300 564.5C1232.5 558 1129.54 597.599 996 597.599C855 597.599 878 606 764 597.599C764 597.599 714.202 553.384 540.5 479.5C363 404 462.5 299.5 334.5 225.5Z"
          fill="url(#paint1_linear_397_3379)"
        />
        <path
          d="M341.5 504C233.5 494 121.5 364 -52.5 460L-1 811.501H1437C1478.17 638.667 1488.09 272.059 1449 176.5C1422 110.499 1272.25 349.001 1126.5 349C996.5 349 855 453.501 684.5 520.29C514 587.078 449.5 514 341.5 504Z"
          fill="url(#paint2_linear_397_3379)"
        />
        <defs>
          <motion.linearGradient
            animate={{ x1: 654.993, y1: 87, x2: 654.993, y2: 810.5 }}
            transition={{ duration: 6 }}
            id="paint0_linear_397_3379"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7849DD" />
            <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{ x1: 646.999, y1: 243.5, x2: 647.045, y2: 813 }}
            transition={{ duration: 4 }}
            id="paint1_linear_397_3379"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#A3A1F3" />
            <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
          </motion.linearGradient>
          <motion.linearGradient
            animate={{ x1: 747.135, y1: 281.095, x2: 747.135, y2: 811.5 }}
            transition={{ duration: 2 }}
            id="paint2_linear_397_3379"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#584CDA" />
            <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
          </motion.linearGradient>
        </defs>
      </SvgPath>
      <Layout>
        {authSwitch ? (
          <Wrapper
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InputForm>
              <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
              <InputWrapper>
                <InputLabel>Email</InputLabel>
                <LogInput />
                <InputLabel>Password</InputLabel>
                <LogInput />
              </InputWrapper>
              <Btnwrapper>
                <CreateAccountButton onClick={handleAuthSwitch}>
                  REGISTER
                </CreateAccountButton>
                <LoginButton>LOGIN</LoginButton>
              </Btnwrapper>
            </InputForm>
          </Wrapper>
        ) : (
          <Wrapper
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InputForm>
              <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
              <InputWrapper>
                <InputLabel>Name</InputLabel>
                <LogInput />
                <InputLabel>Password</InputLabel>
                <LogInput />
              </InputWrapper>
              <Btnwrapper>
                <CreateAccountButton onClick={handleAuthSwitch}>
                  REGISTER
                </CreateAccountButton>
                <LoginButton>LOGIN</LoginButton>
              </Btnwrapper>
            </InputForm>
          </Wrapper>
        )}
      </Layout>
    </>
  );
};

export default login;
