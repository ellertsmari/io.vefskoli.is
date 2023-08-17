import { useState, ChangeEvent, MouseEventHandler } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import {
  Wrapper,
  Layout,
  VefskolinnLogo,
  InputForm,
  LogInput,
  InputWrapper,
  InputLabel,
  Btnwrapper,
} from "../../styles/pageStyles/authpage.styles";
import { FilledButton } from "@/components/buttons/filledButton";
import { TextButton } from "@/components/buttons/textButton";
import AnimatedBackground from "@/components/animatedBackground";
import { AnimatePresence } from "framer-motion";
import login from "../api/auth/login";


type CredentailsData = {
  email: string;
  password: string;
}

const authPage = () => {
  const [authSwitch, setAuthSwitch] = useState(true);
  const [credentials, setCredentials] = useLocalStorage<CredentailsData>("credentails", {email:"", password:""});
  
  const handleAuthSwitch : MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setAuthSwitch(!authSwitch);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value});
  }
  const login: MouseEventHandler<HTMLAnchorElement> = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};

  return (
    <>
      <AnimatedBackground />
      <Layout>
      <AnimatePresence>
      
        <Wrapper
          layout
          initial={{ opacity: 0, y:500}}
          animate={{ opacity: 1, y:0}}
          exit={{ opacity: 0 }}
        >
          <InputForm>
            <VefskolinnLogo>{"{ Vefskolinn }"}</VefskolinnLogo>
            {authSwitch ? (
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
              </InputWrapper>):(
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
                   <InputLabel>Background - what have you studied or worked with?</InputLabel>
                   <LogInput />
                   <InputLabel>Near future career goals</InputLabel>
                   <LogInput />
                   <InputLabel>Main interests</InputLabel>
                   <LogInput />
                   <InputLabel>Favourite band/s or artist/s</InputLabel>
                   <LogInput />
                 </InputWrapper>
              )}
              <Btnwrapper>
                <TextButton onClick={handleAuthSwitch}>
                  {authSwitch?"Create Account":"I already have an account"}
                </TextButton>
                <FilledButton onClick={login} href="/"> {authSwitch? "LOGIN":"REGISTER"} </FilledButton>
              </Btnwrapper>
            </InputForm>
          </Wrapper>

         
       
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default authPage;
