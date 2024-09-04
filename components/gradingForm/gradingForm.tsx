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
import { useRouter } from "next/navigation";


type ReviewWithId = ReviewType & { _id: string };

interface Props {
  review: ReviewWithId;
  guide: AggregatedGuide;
  isOpen: boolean;
  canGrade: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const GradingForm = ({guide, review, isOpen, setIsOpen, canGrade}:Props) => {
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
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if  (e.target === e.currentTarget) setIsOpen(!isOpen)
  }
  const gradeMeanings = [
    '1 - The feedback was not helpfull at all (could be something like just "good" or "bad")',
    '2 - The feedback was not very helpfull (could be something like "good job" or "I liked it")',
    '3 - The feedback was not helpfull (maybe just one line of text or something like that)',
    '4 - The feedback was hardly helpfull (was maybe just one sentence or two)',
    '5 - The feedback pointed out some specific things that could be improved or that they liked (maybe a few sentences)',
    '6 - The feedback was helpfull (it was clear that the reviewer had looked at the project and thought about it)',
    '7 - The feedback was very helpfull (it was clear that the reviewer had looked at the project and thought about it and they gave some specific advice)',
    '8 - The feedback was very helpfull (it was a thoughtful and a very thorough review with specific advice)',
    '9 - The feedback was very helpfull (it was a thoughtful and thorough review with specific advice and suggestions for improvement or praise for the good parts)',
    '10 - The feedback was very helpfull (it was a thoughtful and thorough review with specific advice and suggestions for improvement and praise for the good parts)'
  ]
  return (
    <>
      {isOpen && (
        <BackgroundOverlay style={{zIndex:3}} onClick={closeModal}>
          <Modal>
            <ProjectTitle>{guide.title}</ProjectTitle>
            <FormContainer>
              <ReturnDetails></ReturnDetails>
              <FeedbackGrade>
                <SubTitle>Feedback</SubTitle>
                <Text>
               {review.comment}
                </Text>
                {canGrade && (
                <>
                  <SubTitle>Grade this feedback</SubTitle>
                  <SliderContainer>
                  <GradeSlider type="range" min='1' max='10' step='1' value={currentValue} onChange={handleInputChange}/>
                  <SliderLables>
                    {Array.from({ length: 10 }, (_,i) => (
                      <Grades key={i} isActive={i + 1 === currentValue} title={gradeMeanings[i]}>
                        {i + 1}
                      </Grades>
                    ))}
                  </SliderLables>
                  </SliderContainer>
                  <Text><i>Hover over the numbers to see what they mean</i></Text>
                  <FilledButton onClick={updateReview}>
                    SUBMIT
                  </FilledButton>
                </>
                )}
              </FeedbackGrade>
            </FormContainer>
          </Modal>
        </BackgroundOverlay>
      )}
    </>
  );
};

export default GradingForm;
