'use client';
import styled from "styled-components"
import { motion } from "framer-motion"

export const Title = styled.h1`
    font-style: Poppins;
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 5%;
    height: 80rem;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    border-radius: 4.2rem;
    padding: 5rem;
    overflow: scroll;

    /* hiding scrollbar */
    ::-webkit-scrollbar {
        display: none;
    }
    /*hiding scrollbar for Firefox */
    scrollbar-width: none;
    
    /*hiding scrollbar for IE 10+ */
    -ms-overflow-style: none;
`

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
  `

  export const GuidesContainer = styled(motion.div) `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 5rem;
    flex-wrap: wrap;
    border-radius: 4.2rem;
    padding: 5rem;

  ` 

  export const Error = styled.p`
    color: red;
    font-size: 1.5rem;
    font-family: "Poppins";
    font-weight: 500;
    margin: 0;
    `