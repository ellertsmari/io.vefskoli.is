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

interface GradeSliderProps {
  onChange?: (value: number) => void;
}

const GradingForm: React.FC<GradeSliderProps> = ({onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(5)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentValue(value);
    if(onChange){
      onChange(value);
    }
  }
  console.log(currentValue)

  return (
    <>
      <FilledButton onClick={() => setIsOpen(!isOpen)}>Open</FilledButton>
      {isOpen && (
        <BackgroundOverlay>
          <Modal>
            <ProjectTitle>Design UX - Design Thinking </ProjectTitle>
            <FormContainer>
              <ReturnDetails></ReturnDetails>
              <FeedbackGrade>
                <SubTitle>Feedback</SubTitle>
                <Text>
                  WOW!! Amazing design, good job You really know Figma well and
                  I can see that you spent a lot of time making such a good
                  design thinking project. I reccomend checking this link to
                  gain even more knowledge in figma: www.greatfigmainfo.com Hope
                  you do well in the group project! :D
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
