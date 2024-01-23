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