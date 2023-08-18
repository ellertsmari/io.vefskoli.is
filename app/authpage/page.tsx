'use client'

import { useState, ChangeEvent, MouseEventHandler } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import {
  Wrapper,
  Layout,
  VefskolinnLogo,
  InputForm,
  InputWrapper,
  InputLabel,
  ButtonWrapper,
} from "../../styles/pageStyles/authpage.styles";
import { TextButton, FilledButton } from "@/components/buttons";
import { ShortInput } from "@/components/inputs";
import AnimatedBackground from "@/components/animatedBackground";
import { AnimatePresence } from "framer-motion";
import login from "../api/auth/login";

type CredentailsData = {
  email: string;
  password: string;
};

const authPage = () => {
  const [authSwitch, setAuthSwitch] = useState(true);
  const [credentials, setCredentials] = useLocalStorage<CredentailsData>(
    "credentails",
    { email: "", password: "" }
  );

  const handleAuthSwitch: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAuthSwitch(!authSwitch);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const login: MouseEventHandler<HTMLAnchorElement> = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {};

  return (
    <>
      <AnimatedBackground />
      <Layout>
        <AnimatePresence>
          <Wrapper
            layout
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <InputForm>
              <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
              {authSwitch ? (
                <InputWrapper>
                  <InputLabel>Email</InputLabel>
                  <ShortInput
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Password</InputLabel>
                  <ShortInput
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                </InputWrapper>
              ) : (
                <InputWrapper>
                  {/* Credentials  */}
                  <InputLabel>Name</InputLabel>
                  <ShortInput />
                  <InputLabel>Email</InputLabel>
                  <ShortInput />
                  <InputLabel>Password</InputLabel>
                  <ShortInput />
                  <InputLabel>Repeat Password</InputLabel>
                  <ShortInput />

                  {/* About you  */}
                  <InputLabel>
                    Background - what have you studied or worked with?
                  </InputLabel>
                  <ShortInput />
                  <InputLabel>Near future career goals</InputLabel>
                  <ShortInput />
                  <InputLabel>Main interests</InputLabel>
                  <ShortInput />
                  <InputLabel>Favourite band/s or artist/s</InputLabel>
                  <ShortInput />
                </InputWrapper>
              )}
              <ButtonWrapper>
                <TextButton onClick={handleAuthSwitch}>
                  {authSwitch ? "Create Account" : "I already have an account"}
                </TextButton>
                <FilledButton onClick={login} href="/">
                  {" "}
                  {authSwitch ? "LOGIN" : "REGISTER"}{" "}
                </FilledButton>
              </ButtonWrapper>
            </InputForm>
          </Wrapper>
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default authPage;
