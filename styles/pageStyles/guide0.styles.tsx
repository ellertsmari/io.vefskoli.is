import styled from "styled-components"
import { motion } from "framer-motion"

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: 25%;
  left: 0;
  `

export const GuideTitle = styled.h1`
    font-size: 3.2rem;
    margin-bottom: 3rem;
`

export const GuideSubtitle = styled.h2`
    font-size: 2.4rem;
`

export const GuideParagraph = styled.p`
    font-size: 1.6rem;
    line-height: 2.5rem;
`

export const MaterialLinks = styled.a`
    font-size: 1.5rem;
    line-height: 4rem;
    align-items: center;
    display: flex;
    width: fit-content;
    height: 3rem;
    text-decoration: none;
    color: #6563eb;
    border: 0.5px solid #6563eb;
    border-radius: 10rem;
    /* padding: 0.5rem; */
    padding-left: 1rem;
    padding-right: 1rem;
    transition: 0.1s ease-in-out;


    &:hover{
        color:white;
        background-color: #6563eb;
    }
`

export const Guide = styled(motion.div) `
width: 110rem;
background: #ffffff;
box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
border-radius: 4.2rem;
padding: 5rem;
margin-top: 15rem;
margin-bottom: 10rem;
gap: 7rem;
display: flex;
flex-direction: column;

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
export const UpperWrapper = styled.div`
    display: flex;
flex-direction: row;
gap: 10rem;
`

export const MainInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:2rem;
`
export const SideOnfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-top: 8rem;
`
export const SideFrame = styled.div`
    background-color: #F0EFFD;
    width: 30rem;
    padding: 4rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const RequirementsWrapper = styled.div`
    height: 25rem;
    background-color: #F0EFFD;
    border-radius: 2rem;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`


export const KnowledgeAndSkillsWrapper = styled.div`
    display: flex;
    justify-content: space-between;

`

export const KnowledgeWrapper = styled.div`
    display:flex;
    flex-direction: column;
    width:fit-content;
`
export const SkillsWrapper = styled.div`
    display:flex;
    flex-direction: column;
    width: fit-content;
`