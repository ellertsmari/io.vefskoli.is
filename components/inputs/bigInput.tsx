import styled from "styled-components";

export const BigInput = styled.textarea`
  box-sizing: border-box;
  width: 85rem;
  height: 18rem;
  background: #f1f1f1;
  border: 1px solid #e6e6e6;
  border-radius: 3rem;
  padding: 1.5rem;
  font-size: 1.9rem;
  outline: none;
  transition: 0.1s ease-in-out;

  &:focus{
    border: 1px solid #3B3A96;
  }

  &:hover{
    border-color: #6563EB;
  }

  @media screen and (max-width: 1540px) {
    width: 42rem;
    height: 4rem;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 1000px) {
    width: 40rem;
    height: 4rem;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 600px) {
    width: 27rem;
    height: 3rem;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 400px) {
    width: 24rem;
    height: 2.5rem;
  }
`;