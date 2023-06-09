import styled from "styled-components";
import Link from "next/link";

const GuideCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const GuideCardInfo = styled.div`
  background-color: #f1f1f1;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 20rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #6563eb;
    color: white;
  }
`;

const GuideInfo = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;
const GuideSubInfo = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins";

`;

const GuideCardReview = styled.div`
  background-color: #f1f1f1;
  box-shadow: 0px 7px 8px rgba(139, 139, 139, 0.25);
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

  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #6563eb;
    color: white;
  }
`;

const GuideCard = () => {
  return (
    <GuideCardContainer>
        <Link style={{textDecoration:"none", color:"black" }} href="/guide0">
      <GuideCardInfo>
        <GuideInfo>Guide 0</GuideInfo>
        <GuideSubInfo>This is the first guide</GuideSubInfo>
      </GuideCardInfo>
      </Link>
      <GuideCardReview>Guide not returned</GuideCardReview>
    </GuideCardContainer>
  );
};

export default GuideCard;
