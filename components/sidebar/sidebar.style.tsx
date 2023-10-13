"use client"
import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "Poppins";
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const NextUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
