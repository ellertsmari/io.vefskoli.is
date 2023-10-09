"use client";
import styled from "styled-components";
import Link from "next/link";
import type { AggregatedGuide } from "@/utils/types/types";
import { useState } from "react";
import GradingForm from "./gradingForm/gradingForm";
import useUser from "@/utils/useUser";
import { motion, useDragControls } from "framer-motion"
import { useRouter } from "next/navigation";

const GuideCardContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const CardInfo = styled.div`
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 20rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position: center;
  gap: 3rem;
  transition: 0.2s ease-in-out;
`;

const Number = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins";
  font-weight: 500;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins";
  text-align: center;
  padding: 2rem;
`;

const Status = styled.div`
  box-shadow: 2px 4px 3px rgba(139, 139, 139, 0.25);
  width: 24rem;
  height: 6.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: "Poppins";
  z-index: 1;
`;

type GuideCardProps = {
  guide: AggregatedGuide;
  nr: number;
};

const GuideCard = ({ guide, nr }: GuideCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const controls = useDragControls()
  const router = useRouter();
  const t = user?.role === "teacher";
  const { isReturned, isReviewed, userReviews, userReturns, oldestReturnId, otherReviews } =
    guide;
  const nrOfReviews = userReviews.length;
  const ungradedReviews = otherReviews.filter((review) => !review.grade);
  otherReviews.length && console.log(otherReviews);
 
  //Getting vote(pass, no pass, recommended to galery) from "otherReviews" object
  const vote = otherReviews.length?otherReviews[0].vote:undefined;
  
  let hasOldReview = false;
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
    //here after are the waiting statuses
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
      href: `/guide/${guide._id}`,
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
      href: `#`,
    },
    {
      text: "Your guide was recommended to gallery, Well Done!",
      condidtion: vote === "recommend to gallery",
      backgroundColor: "#A5A6F6",
      backgroundImg: `url("star.svg")`,
      backgroundRepeat: "no-repeat",
      href: `#`
    },
    {
      text: "Waiting until someone reviews you project",
      condition: !vote,
      backgroundColor: "#B5E2A8",
      backgroundImg: `url("hourglass.svg")`,
      backgroundRepeat: "no-repeat",
      href: `#`,
    },
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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
  const modifiedColor = isHovered ? "brightness(80%)" : "brightness(100%)"
  const startDrag = (event: PointerEvent) => { 
    event.stopPropagation();
    event.preventDefault();
    controls.start(event, { snapToCursor: false });
  }
  const goToGuide = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event.target);
    if(event.target instanceof HTMLDivElement && event.target.id==="drag") return;
    router.push(`/guide/${guide._id}?isreturned=${isReturned}`)
  }
  const pos = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    console.log(info.delta);
    console.log(info)
  }
  return (
    <GuideCardContainer drag={true} dragControls={controls} onDrag={pos}>
      <CardInfo 
        style={{
          backgroundPosition:"center",
          backgroundImage:
            returnStatus.condition === !isReturned ? "none" : returnStatus.backgroundImg,
          backgroundRepeat:
            returnStatus.condition === !isReturned ? "none" : returnStatus.backgroundRepeat,
          backgroundColor:
            returnStatus.condition === !isReturned ? "#F1F1F1" : returnStatus.backgroundColor,
          filter: modifiedColor,
        }}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onClick={goToGuide}
      >
        <Number>Guide {nr+1}</Number>
        <Title>{isHovered ? returnStatus.text : guide.title}</Title>
        {t && <div>
          delete, 
          <Link href={`saveGuide/${guide._id}`}>edit</Link> 
          <motion.div 
            id="drag"
            onPointerDown={(e: React.PointerEvent<Element>) => startDrag(e.nativeEvent)}
            style={{position:"absolute", top:0, left:0, width:"6rem", height:"6rem", backgroundImage:'url(draggable.webp)', backgroundSize:"contain"}} /> 
        </div>}
      </CardInfo>
      <Link onClick={() => setIsOpen(!isOpen)} href={reviewStatus.href}>
        <Status
          style={{ background: reviewStatus.backgroundColor, filter: modifiedColor }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {reviewStatus.text}
        </Status>
      </Link>
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
