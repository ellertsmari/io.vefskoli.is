"use client"
import styled from "styled-components"

export const NavContainer = styled.nav`
    width:100%;
    height: 12rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const Button = styled.button`
    width: 19rem;
    height: 5rem;
    background-color: white;
    box-shadow: 0px 4px 3px rgba(139, 139, 139, 0.15);
    border: none;
    border-radius: 3.5rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    :hover{
        background-color: #6563eb;
        color:white;
    }
`