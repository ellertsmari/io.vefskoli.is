// HALL OF FAME STUFF
// creating the display for the guide information as well as a hover effect and a modal

"use client";

// importing necessary libraries and types
import { useState } from "react";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import React from "react";
import Edit from "./editCard";
// importing the styles for the fameCard
import {
  GuideCardContainer,
  CardInfo,
  Title,
  TitleWrapper,
  DescriptionWrapper,
  HoveredDescription,
  PencilEdit,
  CloseX,
  Overlay,
  ImgStyle,
  OpenModal,
} from "./styles";

// defining the type of the props that the FameCard component will receive
type Props = {
  guide: GuideType;
  returnData: ReturnType;
};

// FameCard component definition
const FameCard = ({ returnData }: Props) => {
  // state variables for handling hover and modal open/close
  const [isReturnHovered, setIsReturnHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // function to handle opening and closing of the modal
  // when the pencil icon is clicked, the modal opens which allows you to 1. change the title of the guide 2. change the picture 3. remove guide from hall of fame
  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  // function to handle mouse enter and leave events
  // when you hover over the Fame card, 'click to view' appears as well as a pencil icon
  const ReturnHandleMouseEnter = () => {
    setIsReturnHovered(true);
  };
  const ReturnHandleMouseLeave = () => {
    setIsReturnHovered(false);
  };

  return (
    <>
      <GuideCardContainer>
        <CardInfo
          // hover effect, click to view and pencil icon appears
          onMouseEnter={ReturnHandleMouseEnter}
          onMouseLeave={ReturnHandleMouseLeave}
        >
          <TitleWrapper>
            {/* displaying the name the student chose for their project */}
            <Title>{returnData.projectName}</Title>
          </TitleWrapper>
          {/* displaying the background image the student chose with pictureUrl when handing in project */}
          <ImgStyle img={returnData.pictureUrl}>
            <DescriptionWrapper>
              {/* if hovering, the click to view nad pencil icon is displayed */}
              <HoveredDescription isShown={isReturnHovered}>
                Click to view
              </HoveredDescription>
            </DescriptionWrapper>
            {/* if hovering, pencil icon appears and if clicked, the modal opens */}
            {isReturnHovered && (
              <PencilEdit onClick={handleOpenModal}>✏️</PencilEdit>
            )}
          </ImgStyle>
        </CardInfo>
      </GuideCardContainer>
      {/* modal opens and an overlay is displayed over the page */}
      {modalOpen && (
        <>
          <Overlay onClick={handleOpenModal}></Overlay>

          <OpenModal>
            <CloseX onClick={handleOpenModal}>X</CloseX>
            <Edit
              // options for editing, the id is the return id, projectName and pictureUrl are initially empty
              // vote cannot be changed here
              returns={{
                _id: returnData._id,
                projectName: "",
                pictureUrl: "",
                vote: "",
              }}
            ></Edit>
          </OpenModal>
        </>
      )}
    </>
  );
};

export default FameCard;