import styled from "styled-components";
import { motion } from "framer-motion";

//Layout of the whole login page
export const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

//div that wraps around login form
export const LoginWrapper = styled(motion.div)`
  display: flex;
  width: 75rem;
  min-height: 65rem;
  background: #ffffff;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
  border-radius: 4.2rem;
  align-items: center;
  justify-content: center;
  flex-direction:column;

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
    min-height: 30rem;
  }
`;

export const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  transform: translate(0%, 15%);
  padding-bottom: 10rem;
`;

export const RegisterWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75rem;
  padding-top: 10rem;
  padding-bottom: 5rem;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
  border-radius: 4.2rem;

  @media screen and (max-width: 1540px) {
    width: 65rem;
    padding-top: 5rem;
    padding-bottom: 0rem;
  }

  @media screen and (max-width: 1000px) {
    width: 55rem;
  }

  @media screen and (max-width: 600px) {
    width: 35rem;
  }

  @media screen and (max-width: 400px) {
    width: 30rem;
    padding-top: 3rem;
    padding-bottom: 0rem;
  }
`;

//The form for loggin in which works as a wrapper
export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;

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

  //Wrapping filled and text buttons
  export const ButtonWrapper = styled.div `
    display: flex;
    flex-direction: column-reverse;
    align-items: end;
    margin-top: 5rem;
    width: 100%;
    gap: 0.5rem;
`