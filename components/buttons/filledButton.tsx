import styled from "styled-components"

export const FilledButton = styled.a`
    text-decoration: none;
    text-align: center;
    width: 12rem;
    height: 4rem;
    border-radius: 10.0rem;
    background-color: #6563EB;
    box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
    border-style: none;
    color: white;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 4rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

  &:hover{
    background-color: #3B3A96;
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
      height: 3rem;
      font-size: 1.1rem;
  }`