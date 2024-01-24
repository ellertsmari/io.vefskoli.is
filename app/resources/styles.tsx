
//THIS FILE needs to be reworked for the purpose of the Resources container. 
//I've removed some stuff we didn't need. 


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

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DropdownContainer = styled.div`
  display: flex;
  gap:2rem;
  align-items: center;
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