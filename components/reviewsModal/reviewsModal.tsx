"use client";

import {
  BackgroundOverlay,
  FeedbackGrade,
  FormContainer,
  GradeSlider,
  SliderContainer,
  SliderLables,
  Modal,
  ProjectTitle,
  ReturnDetails,
  SubTitle,
  Text,
  Grades,
  ReviewComment,
  GradingContainer,
} from "../gradingForm/gradingForm.style";
import { StyledLink } from "../sidebar/nextup/nextUp.style";
import { FilledButton } from "../buttons";
import { useEffect, useState } from "react";
import { ReviewType } from "@/models/review";
import { AggregatedGuide } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { Dispatch, SetStateAction } from "react";

type ReviewWithId = ReviewType & { _id: string };

interface Props {
  reviews: {received:ReviewWithId[], given:ReviewWithId[]};
  guide: AggregatedGuide;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newReviewURL: string;
}

const ReviewsModal = ({ guide, reviews, isOpen, setIsOpen, newReviewURL }: Props) => {
  const [index, setIndex] = useState(0);
  const [givenOrReceived, setGivenOrReceived] = useState(reviews.received);
  const showReceived = givenOrReceived[0]._id === reviews.received[0]._id;

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(!isOpen);
  };
  const getNextReview=(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(givenOrReceived[0]._id === reviews.received[0]._id){
      setIndex((index+1)%reviews.received.length)
    }else{
      setIndex((index+1)%reviews.given.length)
    }
  }

  const toggleGivenReceived=(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(showReceived){
      setGivenOrReceived(reviews.given)
    }else{
      setGivenOrReceived(reviews.received)
    }
    setIndex(0)
  }

  return (
    <>
      {isOpen && (
        <BackgroundOverlay style={{ zIndex: 3 }} onClick={closeModal}>
          <Modal>
            <FormContainer>
              <FeedbackGrade>
                <div style={{ padding: "40px 0", width: "80%" }}>
                  <ProjectTitle>{guide.title}</ProjectTitle>
                </div>
                <SubTitle>Feedback</SubTitle>
                <ReviewComment>

                      <Text>{givenOrReceived? givenOrReceived[index].comment : "You have not received any reviews yet..."}</Text>

                </ReviewComment>
                <SubTitle>GRADE: {givenOrReceived ? <span style={{ color: "red" }}>{givenOrReceived[index].grade}</span> : "N/A"}</SubTitle>
                  <SliderLables>
                    <FilledButton><a href={newReviewURL || ""}>Make another review</a></FilledButton>
                  <FilledButton onClick={toggleGivenReceived}>{showReceived ? "Show Given Reviews" : "Show Received Reviews"}</FilledButton>
                    <FilledButton onClick={getNextReview}>show another review</FilledButton>
                  </SliderLables>
              </FeedbackGrade>
            </FormContainer>
          </Modal>
        </BackgroundOverlay>
      )}
    </>
  );
};


export default ReviewsModal;
