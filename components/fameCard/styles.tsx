import styled from "styled-components";


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

export const BackgroundImage = styled.img`
 background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="194" height="187" viewBox="0 0 194 187" fill="none" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M37.1025 187L52.865 117.859L0 71.3553L69.84 65.2039L97 0L124.16 65.2039L194 71.3553L141.135 117.859L156.897 187L97 150.338L37.1025 187Z" fill="black" fill-opacity="0.1"/></svg>');
 background-image: cover;

`

export const CardInfo = styled.div`
  box-shadow: 2px 3px 3px 2px rgba(196, 186, 186, 0.25);
  width: 24rem;
  height: 20rem;
  border-radius: 2rem ;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-position: center;
  background-color: rgb(162, 161, 243);

   `

export const Title = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TitleWrapper = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
`;

export const Description = styled.h2<TitleProps>`
  font-size: 1.5rem;
  font-family: "Poppins";
  transition: opacity 0.3s; // Add the transition effect
  position: absolute;
  text-align: center;
  padding: 1rem;
`;

export const DefaultDescription = styled(Description)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`
export const HoveredDescription = styled(Description)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`