import styled from "styled-components"

export const TextButton = styled.button`
height: 4rem;
background-color: white;
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
  width: 17rem;
  height: 3.5rem;
  font-size: 1.4rem;
}

@media screen and (max-width: 1000px) {
  width: 17rem;
  height: 3.5rem;
  font-size: 1.4rem;
}

@media screen and (max-width: 600px) {
  width: 14rem;
  height: 3rem;
  font-size: 1.1rem;
}`