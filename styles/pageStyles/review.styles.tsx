"use client"
import styled from "styled-components"

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  `

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 130rem;
    min-height: 80rem;
    margin: 15rem;
    background: #ffffff;
    box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
    border-radius: 4.2rem;
    padding: 5rem;
    gap: 10rem;
`
export const SectionTitle = styled.h1`
    font-family: poppins;
    font-weight: 500;
    font-size: 3.2rem;
    text-align: left;
`

export const SubTitle = styled.h2`
    font-family: poppins;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: left;
`

export const MainText = styled.p`
    font-family: poppins;
    font-size: 1.6rem;
    text-align: left;
`

export const LinkText = styled.a`
    font-family: poppins;
    font-size: 1.6rem;
    text-align: left;
    color: #6563EB;
`


//Return detail sections and all of it's styles
export const ReturnDetailsSection = styled.div`
    width: 50%;
    
`
export const Frame = styled.div`
    background-color: #F0EFFD;
    padding:3rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
`

export const Photo = styled.img`
    
`

//Review sections and all of it's styles
export const ReviewSection = styled.div`
    width: 50%;
`
export const ReviewFrame = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
`

export const BulletList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const VotingForm = styled.form`
    display:flex;
    flex-direction: column;
`