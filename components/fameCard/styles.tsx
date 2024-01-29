//HALL OF FAME STUFF

import styled from "styled-components";

type TitleProps = {
  isShown: boolean;
};

type CardInfoProps = {
  img: string | undefined;
};

export const GuideCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const CardInfo = styled.div`
  box-shadow: 2px 3px 3px 2px rgba(196, 186, 186, 0.25);
  width: 24rem;
  height: 20rem;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ImgStyle = styled.div<CardInfoProps>`
  height: 20rem;
  width: 24rem;
  background-position: center;
  background-image: ${({ img }) => (img ? `url('${img}')` : `url('star.svg')`)};
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0 0 2rem 2rem;
  transition: 2s;
  &:hover {
    background: #ffffff;
  }
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
`;

export const TitleWrapper = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
`;

export const PencilEdit = styled.div`
  position: relative;
  bottom: 2.2rem;
  left: 8.5rem;
  font-size: 2rem;
`;

export const Description = styled.h2<TitleProps>`
  font-size: 1.5rem;
  font-family: "Poppins";
  transition: opacity 0.3s;
  position: absolute;
  text-align: center;
  padding: 1rem;
`;

export const Modal = styled.div`
  padding: 2rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000000;
  filter: opacity(0.7);
  z-index: 19;
`;
//Hello
export const CloseX = styled.span`
  color: white;
  padding: 1rem 1.5rem 0 0;
  display: flex;
  justify-content: flex-end;
  font-size: 2rem;
  cursor: pointer;
`;

export const Label = styled.input`
  outline: none;
`;

export const DefaultDescription = styled(Description)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`;

export const HoveredDescription = styled(Description)`
  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
`;
