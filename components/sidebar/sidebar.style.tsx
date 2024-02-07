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

const StyledAnchor = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "Poppins";
  & > h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25rem; /* Adjust this value to the width of your card or desired truncation width */
  }
`

// Define props type for StyledLink
interface StyledLinkProps {
  children: React.ReactNode; // Type for any valid React child
  href: string; // Assuming href is a string for simplicity, adjust as needed
  className?: string; // Optional className prop
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // Optional onClick prop
}

// Use the StyledLinkProps type for your component props
export const StyledLink: React.FC<StyledLinkProps> = ({ children, href, onClick, className }) => (
  <Link href={href} passHref>
    <StyledAnchor>{children}</StyledAnchor>
  </Link>
);


export const Title = styled.h1`
  font-size: 1.8rem;
  font-family: "Poppins";
`;


export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`