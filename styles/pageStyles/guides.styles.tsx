'use client';
import styled from "styled-components"
import { motion } from "framer-motion"

export const Title = styled.h1`
    font-style: Poppins;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    border-radius: 4.2rem;
    padding: 5rem;
    overflow-y: scroll;
    max-height: 75vh;
    width: calc(100% - 25rem);
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
  `

  export const GuidesContainer = styled(motion.div) `
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  ` 

  export const Error = styled.p`
    color: red;
    font-size: 1.5rem;
    font-family: "Poppins";
    font-weight: 500;
    margin: 0;
    `