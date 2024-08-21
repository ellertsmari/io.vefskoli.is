import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";


type TitleProps = {
  isShown: boolean;
}

export const GuideCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const StyledAnchor = styled.a`
  color: black;
  text-decoration: none;
`;

// Define props type for StyledLink
interface StyledLinkProps {
  children: React.ReactNode; // Type for any valid React child
  href: string; // Assuming href is a string for simplicity, adjust as needed
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // Optional onClick prop
}

// Use the StyledLinkProps type for your component props
export const StyledLink: React.FC<StyledLinkProps> = ({ children, href }) => (
  <Link href={href} passHref>
    <StyledAnchor>{children}</StyledAnchor>
  </Link>
);

export const CardInfo = styled.div`
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 20rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-position: center;
`;

export const NumberWrapper = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
  text-decoration: none;
`;

export const Number = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
  text-decoration: none;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.h2<TitleProps>`
  font-size: 1.5rem;
  font-family: "Poppins";
  transition: opacity 0.3s; // Add the transition effect
  position: absolute;
  text-align: center;
  padding: 1rem;
`;

export const DefaultTitle = styled(Title)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`
export const HoveredTitle = styled(Title)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`

export const Status = styled.div`
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 6.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: "Poppins";
  z-index: 1;
`;
