'use client';
import styled from "styled-components";
import Link from "next/link";
import { GuideType } from "@/models/guide";
import mongoose from "mongoose";
import guide from "@/app/guide/[id]/page";
import type { AggregatedGuide } from "@/utils/types/types";
import { useState } from "react";
import GradingForm from "./gradingForm/gradingForm";
import ReturnForm from "./returnFrom/returnForm";
import { Types } from "mongoose";

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
  const needsGrading = ungradedReviews.length>0;
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
  const status = !isReturned ? {
    text: "Guide not returned",
    color: "#F1F1F1",
    href: `/guide/${guide._id}`
  }: !oldestReturnId ? {
    text: "You should be able to review this guide as soon as someone returns it",
    color: "#008800",
    href: `#`
  }: nrOfReviews===0 ? {
    text: "You need to make two reviews before you get your grade",
    color: "#FECA9D",
    href: `/review/${oldestReturnId}`
  }: nrOfReviews===1 ? {
    text: "Only one more review to go, you are almost there!",
    color: "linear-gradient(to right, #B5E2A8, #FECA9D)",
    href: `/review/${oldestReturnId}`
  }: needsGrading? {
    text: "Please grade the review",
    color: "#72BBFF",
    href: `#`
  }: grade? {
    text: "Grade: "+grade,
    color: "#B5E2A8",
    href: `#`
  } : {
    text: "you will get your grade as soon as someone gives you a grade",
    color: "#B5E2A8",
    href: `#`
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const modifiedColor = isHovered ? "brightness(80%)" : "brightness(100%)"
  return (
    <GuideCardContainer>
      <Link style={{textDecoration:"none", color:"black" }} href={`/guide/${guide._id}`} >
        <CardInfo style={{backgroundColor: status.text==="Guide not returned"?"#F1F1F1":"#B5E2A8", filter: modifiedColor}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Number>Guide {nr+1}</Number>
          <Title>{guide.title}</Title>
        </CardInfo>
      </Link>
      <Link onClick={()=>setIsOpen(!isOpen)} href={status.href}><Status style={{background: status.color, filter: modifiedColor}} >{status.text}</Status></Link>
      {status.text==="Please grade the review" && <GradingForm guide={guide} review={ungradedReviews[0]} isOpen={isOpen} setIsOpen={setIsOpen}/> }
    </GuideCardContainer>
  );
};

export default GuideCard;
