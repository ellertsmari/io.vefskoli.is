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
} from "./gradingForm.style";
import { FilledButton } from "../buttons";
import { useState } from "react";
import { ReviewType } from "@/models/review";
import { AggregatedGuide } from "@/utils/types/types";


type ReviewWithId = ReviewType & { _id: string };

interface Props {
  review: ReviewWithId;
  guide: AggregatedGuide;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const GradingForm = ({guide, review, isOpen, setIsOpen}:Props) => {
  const [currentValue, setCurrentValue] = useState(5)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentValue(value);
  }
  console.log(currentValue)

  const updateReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedReview = await fetch(`/api/reviews/${review._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        vote: currentValue,
      }),
    });//TODO: add error handling
  }
  return (
    <>
      {isOpen && (
        <BackgroundOverlay>
          <Modal>
            <ProjectTitle>{guide.title}</ProjectTitle>
            <FormContainer onSubmit={updateReview}>
              <ReturnDetails></ReturnDetails>
              <FeedbackGrade>
                <SubTitle>Feedback</SubTitle>
                <Text>
               {review.comment}
                </Text>
                <SubTitle>Grade this feedback</SubTitle>
                <SliderContainer>
                <GradeSlider type="range" min='1' max='10' step='1' value={currentValue} onChange={handleInputChange}/>
                <SliderLables>
                  {Array.from({ length: 10 }, (_,i) => (
                    <Grades key={i} isActive={i + 1 === currentValue}>
                      {i + 1}
                    </Grades>
                  ))}
                </SliderLables>
                </SliderContainer>
                <FilledButton onClick={() => setIsOpen(!isOpen)}>
                  SUBMIT
                </FilledButton>
              </FeedbackGrade>
            </FormContainer>
          </Modal>
        </BackgroundOverlay>
      )}
    </>
  );
};

export default GradingForm;
