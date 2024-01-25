
'use client';
//THIS FILE needs to be reworked for the purpose of the Resources container. 
//I've removed some stuff we didn't need. 


type Props={
 image?: string;
}


import styled from "styled-components"
import { motion } from "framer-motion"
import { type } from "os";

export const Title = styled.h1`
//styleName: desktop/heading2;
font-family: Poppins;
font-size: 24px;
font-weight: 500;
line-height: 36px;
letter-spacing: 0px;
text-align: left;
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
    width: 100%;git
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
    export const VideoCard  = styled.div <Props>`
    width: 250px;
    height: 250px;
    background-color: #D1D1D1;
    border-radius: 20px;
    background-image: url(${props => props.image || ''});
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor:pointer;
    `

    export const VideoCardText = styled.div`
    font-family: Poppins;
    font-size: 40px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: center;
    text-decoration: none;
    color: black;
    `
    