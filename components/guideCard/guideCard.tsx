"use client";

import type { AggregatedGuide } from "@/utils/types/types";
import { useState, useEffect } from "react";
import GradingForm from "../gradingForm/gradingForm";
import ReviewsModal from "../reviewsModal/reviewsModal"
import {GuideCardContainer, CardInfo, Number, Title, Status, StyledLink, TitleWrapper, NumberWrapper, DefaultTitle, HoveredTitle} from "./styles"

import { getReturnStatus, getReviewStatus } from "./guideStates";



type GuideCardProps = {
  guide: AggregatedGuide;
  nr: number;
};

const GuideCard = ({ guide, nr }: GuideCardProps) => {
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [isReturnHovered, setIsReturnHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [reviewToShow, setReviewToShow] = useState(0);



  const { isReturned, userReviews, userReturns, oldestReturnId, otherReviews } = guide;

  const nrOfReviews = userReviews.length;
  const ungradedReviews = otherReviews.filter((review) => !review.grade);
  const reviewsForLatestReturn = otherReviews.filter((review  ) => review.return?.toString() === userReturns[userReturns.length-1]._id);

  //Getting vote(pass, no pass, recommended to Hall of fame) from "otherReviews" object
  const vote = reviewsForLatestReturn.length?reviewsForLatestReturn[0].vote:undefined;
  //console.log("this is the guide", guide)
  //


  //Calculating whether a student still has to review guide or guides based on when he has returned
  let hasOldReview = false
  if(userReturns.length){
    const createdAt:number = (new Date(userReturns[0].createdAt)).getDate()
    hasOldReview = ((Date.now() - createdAt) > 1000*1000*60*60*24*3)
  }

  const needsGrading = ungradedReviews.length > 0;
  // calculate grade based on the two highest grades or one if only one review has been graded
  let grade = 0;
  if (nrOfReviews === 1) {
    grade = userReviews[0].grade || 0;
  } else if (nrOfReviews > 1) {
    userReviews.sort((a, b) => (b.grade || 0) - (a.grade || 0));
    const highestGrade = userReviews[0].grade || 0;
    const secondHighestGrade = userReviews[1].grade || highestGrade;
    grade = (highestGrade + secondHighestGrade) / 2;
  } //if the grade is 0, it means that the review has not been graded yet

  const id = JSON.parse(JSON.stringify(guide._id));
  const returnStatuses = getReturnStatus(isReturned, needsGrading, vote || "", id);
  const reviewStatuses = getReviewStatus(isReturned, needsGrading, nrOfReviews, oldestReturnId, hasOldReview, id, grade);


  //Return hover state
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

  const returnStatus = returnStatuses.find((status) => status.condition);
  if (!returnStatus) {
    console.log("no returnStatus found", vote);
    return <>returnStatus not found</>;
  }

  const reviewStatus = reviewStatuses.find((status) => status.condition);
  if (!reviewStatus) {
    console.log("no reviewStatus found");
    return <>reviewStatus not found</>;
  }




  return (
    <GuideCardContainer>
      <StyledLink href={returnStatus.href}>
        <CardInfo
          style={{
            backgroundPosition:"center",
            backgroundImage:
              returnStatus.condition === !isReturned ? "none" : returnStatus.backgroundImg,
            backgroundRepeat:
              returnStatus.condition === !isReturned ? "none" : returnStatus.backgroundRepeat,
            backgroundColor:
              returnStatus.condition === !isReturned ? "#F1F1F1" : returnStatus.backgroundColor,
            filter: returnModifiedColor,
          }}
          onMouseEnter={RetunrHandleMouseEnter}
          onMouseLeave={ReturnHandleMouseLeave}
        >
          <NumberWrapper>
          <Number>Guide {nr+1}</Number>
          </NumberWrapper>
          <TitleWrapper>
          <DefaultTitle isShown={!isReturnHovered && !isReviewHovered}>
              {guide.title}
            </DefaultTitle>
          <HoveredTitle isShown={isReturnHovered || isReviewHovered}>
              {returnStatus.text}
            </HoveredTitle>
            </TitleWrapper>
        </CardInfo>
      </StyledLink>
      <StyledLink href={reviewStatus.href}>
        <Status
          style={{ background: reviewStatus.backgroundColor, filter: reviewModifiedColor }}
          onMouseEnter={ReviewHandleMouseEnter}
          onMouseLeave={ReviewHandleMouseLeave}
          onClick={() => setIsOpen(!isOpen)}
        >
          {reviewStatus.text}
        </Status>
      </StyledLink>
      {returnStatus && reviewStatus.condition === needsGrading && (
          <GradingForm
            guide={guide}
            review={ungradedReviews[0]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            canGrade={true}
          />
        )}
        {returnStatus && reviewStatus.condition === grade && (
          <ReviewsModal
            guide={guide}
            reviews={{ received: otherReviews, given: userReviews }}
            newReviewURL={`/review/${oldestReturnId}`}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            canGrade={false}
          />
        )}
    </GuideCardContainer>
  );
};

export default GuideCard;
