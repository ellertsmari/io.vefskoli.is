import styled from "styled-components";
import { motion } from "framer-motion";

// $smallFontSize: 1.4rem;
// $mediumFontSize: 1.6rem;
// $largeFontSize: 2rem;
// $headerFontSize: 2.4rem;
// $mainHeaderFontSize: 3.2rem;

//Layout of the whole login page
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: 25%;
  left: 0;
`;

//div that wraps around login form
export const Wrapper = styled(motion.div)`
  display: flex;
  width: 75rem;
  min-height: 65rem;
  background: #ffffff;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
  border-radius: 4.2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1540px) {
    width: 65rem;
    min-height: 55rem;
  }

  @media screen and (max-width: 1000px) {
    width: 55rem;
    min-height: 45rem;
  }

  @media screen and (max-width: 600px) {
    width: 35rem;
    min-height: 40rem;
  }

  @media screen and (max-width: 400px) {
    width: 30rem;
    min-height: 35rem;
  }
`;

//Vefskolinn Logo
export const VefskolinnLogo = styled.h1`
  font-weight: 500;
  font-size: 5rem;
  margin-bottom: 8rem;

  @media screen and (max-width: 1540px) {
    font-size: 3.5rem;
    margin-bottom: 5rem;
  }

  @media screen and (max-width: 1000px) {
    font-size: 3.3rem;
    margin-bottom: 5rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 2.3rem;
    margin-bottom: 3rem;
  }
`;

//The form for loggin in which works as a wrapper
export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Wrapps around the input for better control
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1540px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;

//Lables for the inputs
export const InputLabel = styled.label`
  text-align: left;
  font-size: 2rem;
  margin: 1rem;
  margin-top: 4rem;

  @media screen and (max-width: 1540px) {
    font-size: 1.6rem;
    margin-top: 3rem;
  }

  @media screen and (max-width: 1000px) {
    font-size: 1.6rem;
    margin-top: 3rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    margin-top: 2rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.4rem;
    margin-top: 2rem;
  }
`;

  //Wrapping filled and text buttons
  export const ButtonWrapper = styled.div `
    display: flex;
    flex-direction: column-reverse;
    align-items: end;
    margin-top: 5rem;
    width: 100%;

  @media screen and (max-width: 1540px) {
      margin-top: 2rem;
  }

  @media screen and (max-width: 1000px) {
      margin-top: 0rem;
  }

  @media screen and (max-width: 600px) {
      margin-top: 0rem;
  }
`