'use client';
import styled from "styled-components";
import Link from "next/link";
import { GuideType } from "@/models/guide";
import mongoose from "mongoose";
import guide from "@/app/guide/[id]/page";
import type { AggregatedGuide } from "@/utils/types/types";

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

  &:hover {
    background-color: #6563eb;
    color: white;
  }
`;

const Number = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins";

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
  const { isReturned, isReviewed, gotReviews, grade, oldestReturnId } = guide;
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
    }: isReturned ? {
      text: "Please review this guide",
      color: "#FECA9D",
      href: `/review/${oldestReturnId}`
    }:{
      text: "Guide not returned",
      color: "#F1F1F1",
      href: `/review/${guide._id}`
    };
  const color = 
  isReturned && isReviewed ? "#B5E2A8" :
  gotReviews && !grade ? "#72BBFF" :
  isReturned ? "#FECA9D" :
  "Guide not returned";
  console.log(guide);
  return (
    <GuideCardContainer>
      <Link style={{textDecoration:"none", color:"black" }} href={`/guide/${guide._id}`} >
        <CardInfo style={{backgroundColor: status.color}}>
          <Number>Guide {nr+1}</Number>
          <Title>{guide.title}</Title>
        </CardInfo>
      </Link>
      <Link href={status.href}><Status>{status.text}</Status></Link>
    </GuideCardContainer>
  );
};

export default GuideCard;
