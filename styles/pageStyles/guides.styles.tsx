'use client';
import styled from "styled-components"
import { motion } from "framer-motion"

export const Title = styled.h1`
    font-style: Poppins;
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 130rem;
    height: 80rem;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    border-radius: 4.2rem;
    padding: 5rem;
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
        min-height: 35rem;
    }
  ` 