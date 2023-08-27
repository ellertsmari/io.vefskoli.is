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

export const Comment = styled.div`
width: 100%;
height: 20rem;
border-radius: 1rem;
background-color: #F5F5F5;
box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
border-style: none;
color: black;
font-weight: 500;
font-size: 1.6rem;
cursor: cursor;
transition: 0.2s ease-in-out;
padding: 1rem;
margin-bottom: 1rem;
overflow-y: scroll;
`

//a nice loader animation div
export const Loader = styled.div`
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #6563EB; /* Blue */
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    animation: spin 2s linear infinite;
    margin: 0 auto;
    margin-top: 10rem;
    margin-bottom: 10rem;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
}`

//a nicely presented tip
export const Tip = styled.div`
    background-color: #F0EFFD;
    padding:3rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    font-family: poppins;
    font-size: 1.6rem;
    text-align: left;
    color: #6563EB;
`