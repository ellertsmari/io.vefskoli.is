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
import { use, useState } from "react";
import { ReviewType } from "@/models/review";
import { AggregatedGuide } from "@/utils/types/types";
import { useRouter } from "next/navigation";


type ReviewWithId = ReviewType & { _id: string };

interface Props {
  review: ReviewWithId;
  guide: AggregatedGuide;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const GradingForm = ({guide, review, isOpen, setIsOpen}:Props) => {
  const [currentValue, setCurrentValue] = useState(5)
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentValue(value);
  }
  console.log(currentValue)

  const updateReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen)
    console.log("update review");
    e.preventDefault();
    const updatedReview = await fetch(`/api/reviews/${review._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        grade: currentValue,
      }),
    });//TODO: add error handling
    console.log(updatedReview)
    router.refresh();
  }
  return (
    <>
      {isOpen && (
        <BackgroundOverlay style={{zIndex:3}}>
          <Modal>
            <ProjectTitle>{guide.title}</ProjectTitle>
            <FormContainer>
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
                <FilledButton onClick={updateReview}>
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
