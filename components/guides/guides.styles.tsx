'use client';
import styled from "styled-components"
import { motion } from "framer-motion"

export const Title = styled.h1`
    font-style: Poppins;
`

export const ModuleTitle = styled.h1`
  font-style: Poppins;
  font-size: 3.2rem;
  font-weight: 500;
`
export const DropdownContainer = styled.div`
  display: flex;
`

export const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    gap: 5rem;
    border-radius: 4.2rem;
    padding: 5rem;
    height:69vh;
    /* hiding scrollbar */
    ::-webkit-scrollbar {
        display: none;
    }
    /*hiding scrollbar for Firefox */
    scrollbar-width: none;
    
    /*hiding scrollbar for IE 10+ */
    -ms-overflow-style: none;
`

  export const GuidesContainer = styled(motion.div) `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow-y: scroll;
  ` 

  export const Error = styled.p`
    color: red;
    font-size: 1.5rem;
    font-family: "Poppins";
    font-weight: 500;
    margin: 0;
    `