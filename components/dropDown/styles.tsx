import styled from "styled-components";
import { motion } from "framer-motion";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6563eb;
  width: 14rem;
  border-radius: 10rem;
  color: white;
  padding: 10px 16px;
  border: none;
  font-family: poppins;
  z-index: 3;
  font-weight: 600;
  font-size: 1.6rem;
  box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #3b3a96;
  }
`;
export const DropdownContent = styled(motion.div)`
  display: none;
  position: absolute;
  top: 100%;
  color: #999999;
  background-color: white;
  width: 14rem;
  border-radius: 1rem;
  box-shadow: 0px 8px 16px 0px;
  z-index: 2;
  text-align: center;
  font-family: poppins;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;

  & a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
      color: #6563eb;
    }
  }

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

export const ArrowImage = styled(motion.div)`
  position: relative;
`;