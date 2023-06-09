import { useState, ChangeEvent } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
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
} from "./authpage.styles";
import AnimatedBackground from "@/components/animatedBackground";
import { AnimatePresence } from "framer-motion";


type CredentailsData = {
  email: string;
  password: string;
}

const authPage = () => {
  const [authSwitch, setAuthSwitch] = useState(true);
  const [credentials, setCredentials] = useLocalStorage<CredentailsData>("credentails", {email:"", password:""});
  
  const handleAuthSwitch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAuthSwitch(!authSwitch);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value});
  }

  return (
    <>
      <AnimatedBackground />
      <Layout>
      <AnimatePresence>
        {authSwitch ? (
          <Wrapper
            layout
            initial={{ opacity: 0, y:500}}
            animate={{ opacity: 1, y:0}}
            exit={{ opacity: 0 }}
          >
            <InputForm>
              <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
              <InputWrapper>
                <InputLabel>Email</InputLabel>
                <LogInput
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
                <InputLabel>Password</InputLabel>
                <LogInput
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </InputWrapper>
              <Btnwrapper>
                <CreateAccountButton onClick={handleAuthSwitch}>
                  Create Account
                </CreateAccountButton>
                <LoginButton href="/"> LOGIN </LoginButton>
              </Btnwrapper>
            </InputForm>
          </Wrapper>
        ) : (
          <Wrapper
            layout
            initial={{ opacity: 0, y:500}}
            animate={{ opacity: 1, y:0}}
            exit={{ opacity: 0 }}
          >
            <InputForm>
              <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
              <InputWrapper>
              {/* Credentials  */}
                <InputLabel>Name</InputLabel>
                <LogInput />
                <InputLabel>Email</InputLabel>
                <LogInput />
                <InputLabel>Password</InputLabel>
                <LogInput />
                <InputLabel>Repeat Password</InputLabel>
              {/* About you  */}

                <LogInput />
                <InputLabel>Repeat Password</InputLabel>
                <LogInput />
                <InputLabel>Repeat Password</InputLabel>
                <LogInput />
                <InputLabel>Repeat Password</InputLabel>
                <LogInput />
                <InputLabel>Repeat Password</InputLabel>
                <LogInput />
              </InputWrapper>
              <Btnwrapper>
                <CreateAccountButton onClick={handleAuthSwitch}>
                  I already have an account
                </CreateAccountButton>
                <LoginButton>REGISTER</LoginButton>
              </Btnwrapper>
            </InputForm>
          </Wrapper>
        )}
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default authPage;
