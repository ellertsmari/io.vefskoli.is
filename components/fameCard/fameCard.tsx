'use client'

import { useState } from "react";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import React from "react";
import { GuideCardContainer, CardInfo, Title, TitleWrapper, DescriptionWrapper, DefaultDescription, HoveredDescription } from "./styles"

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
        <TitleWrapper>
          <Title>{returnData.projectName}</Title>
        </TitleWrapper>
        <DescriptionWrapper>
          <DefaultDescription isShown={!isReturnHovered && !isReviewHovered}>
          </DefaultDescription>
          <HoveredDescription isShown={isReturnHovered || isReviewHovered}>
            Click to view
          </HoveredDescription>
        </DescriptionWrapper>
      </CardInfo>
    </GuideCardContainer>
  );
};

export default FameCard;