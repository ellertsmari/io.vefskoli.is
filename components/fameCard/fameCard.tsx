"use client";

import { useState } from "react";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import React from "react";
import {
  GuideCardContainer,
  CardInfo,
  Title,
  TitleWrapper,
  DescriptionWrapper,
  DefaultDescription,
  HoveredDescription,
  PencilEdit,
} from "./styles";
import Edit from "./editCard";
type Props = {
  guide: GuideType;
  returnData: ReturnType;
};

const FameCard = ({ guide, returnData }: Props) => {
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [isReturnHovered, setIsReturnHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };
  const ReturnHandleMouseEnter = () => {
    setIsReturnHovered(true);
  };
  const ReturnHandleMouseLeave = () => {
    setIsReturnHovered(false);
  };
  const returnModifiedColor = isReturnHovered
    ? "brightness(80%)"
    : "brightness(100%)";
  //Review hover state
  const ReviewHandleMouseEnter = () => {
    setIsReviewHovered(true);
  };
  const ReviewHandleMouseLeave = () => {
    setIsReviewHovered(false);
  };
  const reviewModifiedColor = isReviewHovered
    ? "brightness(80%)"
    : "brightness(100%)";
    
  return (
    <>
      <GuideCardContainer>
        <CardInfo
          onMouseEnter={ReturnHandleMouseEnter}
          onMouseLeave={ReturnHandleMouseLeave}
          style={{
            backgroundPosition: "center",
            //backgroundImage:
            // returnStatus.condition === !isUrl ? 'nota það' : returnStatus.backgroundImg
          }}
        >
          <TitleWrapper>
            <Title>{returnData.projectName}</Title>
          </TitleWrapper>
          <DescriptionWrapper>
            <DefaultDescription
              isShown={!isReturnHovered && !isReviewHovered}
            ></DefaultDescription>
            <HoveredDescription isShown={isReturnHovered || isReviewHovered}>
              Click to view
            </HoveredDescription>
          </DescriptionWrapper>
            {isReturnHovered && (
            <PencilEdit onClick={handleOpenModal}>✏️</PencilEdit>
          )}
        </CardInfo>
      </GuideCardContainer>
      {modalOpen && (
        <Edit returns={{
          _id:returnData._id,
          projectName: "",
          pictureUrl: "",
          vote: ""
        }}></Edit>
      )}
    </>
  );
};

export default FameCard;