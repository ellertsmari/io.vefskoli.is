// HALL OF FAME STUFF

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
  CloseX,
  Overlay,
  ImgStyle,
  OpenModal,
} from "./styles";
import Edit from "./editCard";
type Props = {
  guide: GuideType;
  returnData: ReturnType;
};

const FameCard = ({ guide, returnData }: Props) => {
  //State variables used for hover states over the Fame cards.
  //When you hover over the Fame card, 'click to view' appears as well as a pencil icon
  //When the pencil icon is clicked, the modal opens which allows you to 1.change the title of the guide 2. change the picture 3. remove guide from hall of fame
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

  return (
    <>
      <GuideCardContainer>
        <CardInfo
          onMouseEnter={ReturnHandleMouseEnter}
          onMouseLeave={ReturnHandleMouseLeave}
        >
          <TitleWrapper>
            <Title>{returnData.projectName}</Title>
          </TitleWrapper>
          <ImgStyle img={returnData.pictureUrl}>
            <DescriptionWrapper>
              <HoveredDescription isShown={isReturnHovered}>
                Click to view
              </HoveredDescription>
            </DescriptionWrapper>
            {isReturnHovered && (
              <PencilEdit onClick={handleOpenModal}>✏️</PencilEdit>
            )}
          </ImgStyle>
        </CardInfo>
      </GuideCardContainer>
      {modalOpen && (
        <>
          <Overlay onClick={handleOpenModal}></Overlay>
          <OpenModal>
            <CloseX onClick={handleOpenModal}>X</CloseX>
            <Edit
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
