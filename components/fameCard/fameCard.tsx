'use client'

import { useState } from "react";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import React from "react";
import { GuideCardContainer, CardInfo, Number, TitleWrapper, NumberWrapper, DefaultTitle, HoveredTitle } from "./styles"

type Props = {
  guide: GuideType;
  returnData: ReturnType;
};

const FameCard = ({ guide , returnData }: Props) => {
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [isReturnHovered, setIsReturnHovered] = useState(false)
  const RetunrHandleMouseEnter = () => {
    setIsReturnHovered(true);
  };
  const ReturnHandleMouseLeave = () => {
    setIsReturnHovered(false);
  };
  const returnModifiedColor = isReturnHovered ? "brightness(80%)" : "brightness(100%)"

  //Review hover state
  const ReviewHandleMouseEnter = () => {
    setIsReviewHovered(true);
  };
  const ReviewHandleMouseLeave = () => {
    setIsReviewHovered(false);
  };
  const reviewModifiedColor = isReviewHovered ? "brightness(80%)" : "brightness(100%)"

  return (
    <GuideCardContainer>
      <CardInfo
        style={{
          backgroundPosition: 'center'
          //backgroundImage:
            // returnStatus.condition === !isUrl ? 'nota það' : returnStatus.backgroundImg
        }}
      >
        <NumberWrapper>
          <Number>{returnData.projectName}</Number>
        </NumberWrapper>
        <TitleWrapper>
          <DefaultTitle isShown={!isReturnHovered && !isReviewHovered}>
          </DefaultTitle>
          <HoveredTitle isShown={isReturnHovered || isReviewHovered}>
            Click to view
          </HoveredTitle>
        </TitleWrapper>
      </CardInfo>
    </GuideCardContainer>
  );
};

export default FameCard;