import styled from "styled-components"

export const TextButton = styled.a`
height: 4rem;
background-color: rgba(255,255,255,0);
border-style: none;
color: #999999;
font-weight: 500;
font-size: 1.6rem;
cursor: pointer;
transition: 0.2s ease-in-out;

&:hover{
  color: #3B3A96;
}

@media screen and (max-width: 1540px) {
  width: 10rem;
  height: 3.5rem;
  font-size: 1.4rem;
}

@media screen and (max-width: 1000px) {
  width: 10rem;
  height: 3.5rem;
  font-size: 1.4rem;
}

@media screen and (max-width: 600px) {
  width: 8rem;
  height: 2rem;
  font-size: 1.1rem;
}`