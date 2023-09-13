'use client';
import styled from "styled-components";
import Link from "next/link";
import type { AggregatedGuide } from "@/utils/types/types";
import { useState } from "react";
import GradingForm from "./gradingForm/gradingForm";

const GuideCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const CardInfo = styled.div`
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
`;

const Number = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins";
  text-align: center;
  padding: 2rem;  console.log("guides reviews: ", nr, isReviewed);

`;

const Status = styled.div`
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
  z-index: 1;

  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #6563eb;
    color: white;
  }
`;
type GuideCardProps = {
  guide: AggregatedGuide;
  nr: number;
  key: string;
};

const GuideCard = ({guide, nr}:GuideCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isReturned, isReviewed, userReviews, oldestReturnId, otherReviews } = guide;
  const nrOfReviews = userReviews.length;
  const ungradedReviews = otherReviews.filter(review => !review.grade);
  otherReviews.length && console.log(otherReviews);
  const needsGrading = ungradedReviews.length>0;
  // calculate grade based on the two highest grades or one if only one review has been graded
  let grade = 0;
  if(nrOfReviews===1) {
    grade = userReviews[0].grade || 0;
  }
  else if(nrOfReviews>1) {
    userReviews.sort((a, b) => (b.grade || 0) - (a.grade || 0));
    const highestGrade = userReviews[0].grade || 0;
    const secondHighestGrade = userReviews[1].grade || highestGrade;
    grade = (highestGrade+secondHighestGrade)/2;
  }//if the grade is 0, it means that the review has not been graded yet


  const returnStatuses = [
    {
      text: "You have not returned the guide yet",
      condition: !isReturned,
      action: "Return guide",
      color: "#F1F1F1",
      href: `/guide/${guide._id}`
    },
    {
      text: "You have got a review, please grade it",
      condition: needsGrading,
      action: "Grade review",
      color: "#72BBFF",
      href: `#`
    },
    {
      text: "Nobody has returned this guide yet, please wait until someone does",
      condition: !oldestReturnId,
      action: "Wait for return",
      color: "#B5E2A8",
      href: `#`
    },
    {
      text: "You have to make two reviews before you get your grade",
      condition: nrOfReviews===0,
      action: "Make review",
      color: "#FECA9D",
      href: `/review/${oldestReturnId}`
    },
    {
      text: "You have to make one more review before you get your grade",
      condition: nrOfReviews===1,
      action: "Make review",
      color: "linear-gradient(to right, #B5E2A8, #FECA9D)",
      href: `/review/${oldestReturnId}`
    },
     //here after are the waiting statuses
    {
      text: "you have not been graded yet, Talk to the teacher if you have been waiting for a long time",
      condition: !grade,
      action: "Wait for grade",
      color: "#B5E2A8",
      href: `#`
    },
    {
      text: "You have received a grade but keep in mind that it might change if some of your reviews have not been graded yet",
      condition: grade,
      action: "grade: "+grade,
      color: "#B5E2A8",
      href: `#`
    }
  ]
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const status = returnStatuses.find(status => status.condition);
  if(!status) {
    console.log("no status found");
    return <>status not found</>
  }
  const modifiedColor = isHovered ? "brightness(80%)" : "brightness(100%)"
  return (
    <GuideCardContainer>
      <Link style={{textDecoration:"none", color:"black" }} href={`/guide/${guide._id}?isreturned=${isReturned}`} >
        <CardInfo style={{backgroundColor: status.text==="You have not returned the guide yet"?"#F1F1F1":"#B5E2A8", filter: modifiedColor}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Number>Guide {nr+1}</Number>
          <Title>{isHovered?status.text:guide.title}</Title>
        </CardInfo>
      </Link>
      <Link onClick={()=>setIsOpen(!isOpen)} href={status.href}><Status style={{background: status.color, filter: modifiedColor}} >{status.action}</Status></Link>
      {status.text==="You have got a review, please grade it" && <GradingForm guide={guide} review={ungradedReviews[0]} isOpen={isOpen} setIsOpen={setIsOpen}/> }
    </GuideCardContainer>
  );
};

export default GuideCard;
