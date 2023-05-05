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
  /* background-image: url("login-graphic-light.svg"); */
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: 25%;
  left: 0;
`;

//div that wraps around login form
export const Wrapper = styled(motion.div)`
  display: flex;
  width: 75rem;
  height: 65rem;
  background: #ffffff;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
  border-radius: 4.2rem;
  align-items: center;
  justify-content: center;
  /* transition: 0.1s ease-in-out; */

  @media screen and (max-width: 1540px) {
    width: 65rem;
    height: 55rem;
  }

  @media screen and (max-width: 1000px) {
    width: 55rem;
    height: 45rem;
  }

  @media screen and (max-width: 600px) {
    width: 35rem;
    height: 40rem;
  }

  @media screen and (max-width: 400px) {
    width: 30rem;
    height: 35rem;
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

//The input fields for the login form
export const LogInput = styled.input`
  box-sizing: border-box;
  width: 55rem;
  height: 5rem;
  background: #f1f1f1;
  border: 1px solid #e6e6e6;
  border-radius: 3rem;
  padding-left: 1.5rem;
  font-size: 1.9rem;
  outline: none;
  transition: 0.1s ease-in-out;

  &:focus{
    border: 1px solid #3B3A96;
  }

  &:hover{
    border-color: #6563EB;
  }

  @media screen and (max-width: 1540px) {
    width: 42rem;
    height: 4rem;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 1000px) {
    width: 40rem;
    height: 4rem;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 600px) {
    width: 27rem;
    height: 3rem;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 400px) {
    width: 24rem;
    height: 2.5rem;
  }
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

export const LoginButton = styled.button`
    width: 12rem;
    height: 4rem;
    border-radius: 10.0rem;
    background-color: #6563EB;
    box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
    border-style: none;
    color: white;
    font-weight: 500;
    font-size: 1.6rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

  &:hover{
    background-color: #3B3A96;
  }


  @media screen and (max-width: 1540px) {
      width: 10rem;
      height: 3.5rem;
      font-size: 1.4rem;
  }

  @media screen and (max-width: 1000px) {
      width: 10rem;
      height: 3.5rem;
      font-size: 1.4rem;
  }

  @media screen and (max-width: 600px) {
      width: 8rem;
      height: 3rem;
      font-size: 1.1rem;
  }
  `

  export const CreateAccountButton = styled.button`
    width: 20rem;
    height: 4rem;
    border-radius: 10.0rem;
    background-color: #6563EB;
    box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
    border-style: none;
    color: white;
    font-weight: 500;
    font-size: 1.6rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover{
      background-color: #3B3A96;
    }

  @media screen and (max-width: 1540px) {
      width: 17rem;
      height: 3.5rem;
      font-size: 1.4rem;
  }

  @media screen and (max-width: 1000px) {
      width: 17rem;
      height: 3.5rem;
      font-size: 1.4rem;
  }

  @media screen and (max-width: 600px) {
      width: 14rem;
      height: 3rem;
      font-size: 1.1rem;
  }`


  export const Btnwrapper = styled.div `
    display: flex;
    justify-content: space-between;
    text-align: right;
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