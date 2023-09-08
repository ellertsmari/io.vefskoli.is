'use client';
import styled from "styled-components";
import Link from "next/link";
import { GuideType } from "@/models/guide";
import mongoose from "mongoose";
import guide from "@/app/guide/[id]/page";
import type { AggregatedGuide } from "@/utils/types/types";
import { useState } from "react";

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
  padding: 2rem;

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

const GuideCard : React.FC<GuideCardProps> = ({guide, nr}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { isReturned, isReviewed, gotReviews, grade, oldestReturnId } = guide;
  console.log("guides reviews: ", nr, isReviewed);
  const status = 
    gotReviews && !grade ? {
      text: "Please grade the review",
      color: "#72BBFF",
      href: `/review/${guide._id}`
    }: isReturned && isReviewed && gotReviews ?{
      text: "Grade: "+grade,
      color: "#B5E2A8",
      href: `/review/${guide._id}`
    }: isReturned && isReviewed ? {
      text: "Waiting for other reviews",
      color: "#FFFFFF",
      href: `/review/${guide._id}`
    }: isReturned ? oldestReturnId ?{
      text: "Please review this guide",
      color: "#FECA9D",
      href: `/review/${oldestReturnId}`
    }:
    {
      text: "You should be able to review this guide as soon as someone returns it",
      color: "#008800",
      href: `/review/${guide._id}`
    }:
    {
      text: "Guide not returned",
      color: "#F1F1F1",
      href: `/review/${guide._id}`
    };
  const color = 
  isReturned && isReviewed ? "#B5E2A8" :
  gotReviews && !grade ? "#72BBFF" :
  isReturned ? "#FECA9D" :
  "Guide not returned";

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
        <CardInfo style={{backgroundColor: status.color, filter: modifiedColor}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Number>Guide {nr+1}</Number>
          <Title>{guide.title}</Title>
        </CardInfo>
      </Link>
      <Link href={status.href}><Status>{status.text}</Status></Link>
    </GuideCardContainer>
  );
};

export default GuideCard;
