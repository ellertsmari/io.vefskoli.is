"use client";

import type { AggregatedGuide } from "@/utils/types/types";
import { useState } from "react";
import GradingForm from "../gradingForm/gradingForm";
import {GuideCardContainer, CardInfo, Number, Title, Status, StyledLink, TitleWrapper, NumberWrapper, DefaultTitle, HoveredTitle} from "./styles"
import review from "@/app/review/[id]/page";



type GuideCardProps = {
  guide: AggregatedGuide;
  nr: number;
};

const GuideCard = ({ guide, nr }: GuideCardProps) => {
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [isReturnHovered, setIsReturnHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const { isReturned, isReviewed, userReviews, userReturns, oldestReturnId, otherReviews } =
  guide;
const nrOfReviews = userReviews.length;
const ungradedReviews = otherReviews.filter((review) => !review.grade);
const reviewsForLatestReturn = otherReviews.filter((review  ) => review.return?.toString() === userReturns[userReturns.length-1]._id);

//Getting vote(pass, no pass, recommended to galery) from "otherReviews" object
const vote = reviewsForLatestReturn.length?reviewsForLatestReturn[0].vote:undefined;
console.log("this is the guide", guide)
//


//Calculating whether a student still has to review guide or guides based on when he has returned
let hasOldReview = false
if(userReturns.length){
  const createdAt:number = (new Date(userReturns[0].createdAt)).getDate()
  hasOldReview = ((Date.now() - createdAt) > 1000*1000*60*60*24*3)
  console.log((Date.now() - createdAt))
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



 const reviewStatuses = [
  {
    text: "Return guide",
    condition: !isReturned,
    backgroundColor: "#F1F1F1",
    href: `/guide/${guide._id}`,
  },
  {
    text: "Grade review",
    condition: needsGrading,
    backgroundColor: "#72BBFF",
    href: `#`,
  },
  {
    text: "nobody to review yet",
    condition: nrOfReviews === 0 && !oldestReturnId,
    backgroundColor: `#FECA9D`,
    href: `#`,
  },
  {
    text:"please finish review",
    condition: nrOfReviews === 0 && hasOldReview,
    backgroundColor: "#F99F9D",
    href:`/review/${oldestReturnId}`
  },
  {
    text: "Make review",
    condition: nrOfReviews === 0,
    backgroundColor: "#FECA9D",
    href: `/review/${oldestReturnId}`,
  },
  {
    text: "nobody to review yet",
    condition: nrOfReviews === 1 && !oldestReturnId,
    backgroundColor: "linear-gradient(to right, #B5E2A8, #FECA9D)",
    href: `#`,
  },
  {
    text: "please finish review",
    condition: nrOfReviews === 1 && hasOldReview,
    backgroundColor: "linear-gradient(to right, #B5E2A8, #F99F9D)",
    href: `/review/${oldestReturnId}`,
  },
  {
    text: "Make another review",
    condition: nrOfReviews === 1,
    backgroundColor: "linear-gradient(to right, #B5E2A8, #FECA9D)",
    href: `/review/${oldestReturnId}`,
  },
  {
    text: "Waiting for grade",
    condition: !grade,
    backgroundColor: "#B5E2A8",
    href: `#`,
  },
  {
    text: "grade: "+grade,
    condition: grade,
    backgroundColor: "#B5E2A8",
    href: `#`,
  },
];

 const returnStatuses = [
  {
    text: "You have not returned the guide yet",
    condition: !isReturned,
    backgroundColor: "#F1F1F1",
    backgroundImg: "none",
    backgroundRepeat: "no-repeat",
    href: `/guide/${guide._id}?isReturned=${isReturned}`,
  },
  {
    text: "You have got a review, please grade it",
    condition: needsGrading,
    backgroundColor: "#72BBFF",
    backgroundImg: `url("bell.svg")`,
    backgroundRepeat: "no-repeat",
    href: `#`,
  },
  {
    text: "You have passed this guide, Well Done!",
    condition: vote === "pass",
    backgroundColor: "#B5E2A8",
    backgroundImg: `url("check.svg")`,
    backgroundRepeat: "no-repeat",
    href: `#`,
  },
  {
    text: "You did not pass this guide, Try again!",
    condition: vote === "no pass",
    backgroundColor: "#F99F9D",
    backgroundImg: `url("x.svg")`,
    backgroundRepeat: "no-repeat",
    href: `/guide/${guide._id}`,
  },
  {
    text: "Your guide was recommended to gallery, Well Done!",
    condition: vote === "recommend to gallery",
    backgroundColor: "#A5A6F6",
    backgroundImg: `url("star.svg")`,
    backgroundRepeat: "no-repeat",
    href: `#`
  },
  {
    text: "Waiting until someone reviews your project",
    condition: !vote,
    backgroundColor: "#B5E2A8",
    backgroundImg: `url("hourglass.svg")`,
    backgroundRepeat: "no-repeat",
    href: `#`,
  },
];
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
    console.log("no returnStatus found");
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
      <StyledLink onClick={() => setIsOpen(!isOpen)} href={reviewStatus.href}>
        <Status
          style={{ background: reviewStatus.backgroundColor, filter: reviewModifiedColor }}
          onMouseEnter={ReviewHandleMouseEnter}
          onMouseLeave={ReviewHandleMouseLeave}
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
          />
        )}
    </GuideCardContainer>
  );
};

export default GuideCard;
