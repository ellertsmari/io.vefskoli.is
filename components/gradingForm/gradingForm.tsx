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
} from "./gradingForm.style";
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
  review: ReviewWithId;
  guide: AggregatedGuide;
  isOpen: boolean;
  canGrade: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  getNextReview?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  newReviewURL?: string;
}

const GradingForm = ({ guide, review, isOpen, setIsOpen, canGrade, getNextReview, newReviewURL }: Props) => {
  const [currentValue, setCurrentValue] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentValue(value);
  };



  const updateReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    console.log("update review");
    e.preventDefault();
    const updatedReview = await fetch(`/api/reviews/${review._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        grade: currentValue,
      }),
    }); //TODO: add error handling
    console.log(updatedReview);
    router.refresh();
  };
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const defaultOverflowStyle = body.style.overflow;
    if (isOpen) {
      body!.style.overflow = "hidden";
    }
    return () => {
      body.style.overflow = defaultOverflowStyle;
      setCurrentValue(undefined);
    };
  }, [isOpen]);

  const gradeMeanings = [
    'The feedback was not helpfull at all (could be something like just "good" or "bad")',
    'The feedback was not very helpfull (could be something like "good job" or "I liked it")',
    "The feedback was not helpfull (maybe just one line of text or something like that)",
    "The feedback was hardly helpfull (was maybe just one sentence or two)",
    "The feedback pointed out some specific things that could be improved or that they liked (maybe a few sentences)",
    "The feedback was helpfull (it was clear that the reviewer had looked at the project and thought about it)",
    "The feedback was very helpfull (it was clear that the reviewer had looked at the project and thought about it and they gave some specific advice)",
    "The feedback was very helpfull (it was a thoughtful and a very thorough review with specific advice)",
    "The feedback was very helpfull (it was a thoughtful and thorough review with specific advice and suggestions for improvement or praise for the good parts)",
    "The feedback was very helpfull (it was a thoughtful and thorough review with specific advice and suggestions for improvement and praise for the good parts)",
  ];
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
                  <Text>{review? review.comment:"You have not received any reviews yet..."}</Text>
                </ReviewComment>
                {canGrade? (
                  <GradingContainer>
                    <SubTitle>Grade this feedback</SubTitle>
                    <SliderContainer>
                      <GradeSlider
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={currentValue}
                        onChange={handleInputChange}
                      />
                      <SliderLables>
                        {Array.from({ length: 10 }, (_, i) => (
                          <Grades
                            key={i}
                            isActive={i + 1 === currentValue}
                            title={gradeMeanings[i]}
                          >
                            {i + 1}
                          </Grades>
                        ))}
                      </SliderLables>
                    </SliderContainer>
                    <Text>
                      {currentValue && gradeMeanings[currentValue - 1]}
                    </Text>
                    <FilledButton
                      onClick={updateReview}
                      disabled={currentValue ? false : true}
                    >
                      SUBMIT
                    </FilledButton>
                  </GradingContainer>
                ):(
                  <SliderLables>
                    <FilledButton><a href={newReviewURL || ""}>Make another review</a></FilledButton>
                    <FilledButton>Show Given Reviews</FilledButton>
                    <FilledButton onClick={getNextReview}>show another review</FilledButton>
                  </SliderLables>
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
