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

type CredentailsData = {
  email: string;
  password: string;
  repeatPassword?: string;
  name?: string;
  background?: string;
  careerGoals?: string;
  interests?: string;
  favouriteBands?: string;
};

async function createUser(body: CredentailsData){
  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
}

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

  const register: MouseEventHandler<HTMLAnchorElement> = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if(credentials.password !== credentials.repeatPassword) return;
    e.preventDefault();
    createUser(credentials);
  };

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
                  <ShortInput 
                    required 
                    type="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Email</InputLabel>
                  <ShortInput
                    required
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange} 
                  />
                  <InputLabel>Password</InputLabel>
                  <ShortInput
                    required
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Repeat Password</InputLabel>
                  <ShortInput 
                    required
                    type="password"
                    name="repeatPassword"
                    value={credentials.repeatPassword}
                    onChange={handleInputChange}
                  />

                  {/* About you  */}
                  <InputLabel>
                    Background - what have you studied or worked with?
                  </InputLabel>
                  <ShortInput 
                    type="text"
                    name="background"
                    value={credentials.background}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Near future career goals</InputLabel>
                  <ShortInput 
                    type="text"
                    name="careerGoals"
                    value={credentials.careerGoals}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Main interests</InputLabel>
                  <ShortInput
                    type="text"
                    name="interests"
                    value={credentials.interests}
                    onChange={handleInputChange}
                  />
                  <InputLabel>Favourite band/s or artist/s</InputLabel>
                  <ShortInput
                    type="text"
                    name="favouriteBands"
                    value={credentials.favouriteBands}
                    onChange={handleInputChange}
                  />
                </InputWrapper>
              )}
              <ButtonWrapper>
                <TextButton onClick={handleAuthSwitch}>
                  {authSwitch ? "Create Account" : "I already have an account"}
                </TextButton>
                <FilledButton onClick={authSwitch? login : register} href="/">
                  {" "}
                  {authSwitch? "LOGIN" : "REGISTER"}{" "}
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
