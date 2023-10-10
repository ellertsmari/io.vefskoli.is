import styled from "styled-components";
import { motion } from "framer-motion";

export const GuideCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const CardInfo = styled.div`
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 20rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position: center;
  gap: 3rem;
  transition: 0.2s ease-in-out;
`;

export const Number = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;
export const Title = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins";
  text-align: center;
  padding: 2rem;
`;

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