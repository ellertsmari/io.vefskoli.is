import Link from "next/link";
import styled from "styled-components"

/*.nextup-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    overflow-y: scroll;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .next {
      display: flex;
      flex-direction: column;  
      align-items: flex-start;
      justify-content: center;
      box-sizing: border-box;
      width: clamp(15rem, 85%, 35rem);
      height:7rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      color: black;
      background: #FFFFFF;
      border: 0.5px solid #FFFFFF;
      box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      text-decoration: none;
    }
  }*/

  export const StyledLink = styled(Link)`
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

  export const Title = styled.h1`
  font-size: 1.8rem;
  font-family: "Poppins";
`;

export const NextUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 2rem;
`
export const NextUpCard = styled.div`
  background-color: #ffffff;
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  display:flex;
  flex-direction: column;
  padding:1.5rem;
  border-radius: 1.5rem;
`
