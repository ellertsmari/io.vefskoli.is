//Here are going to be all the states for the guides 
export const getReviewStatus = (
    isReturned:boolean, 
    needsGrading:boolean, 
    nrOfReviews:number, 
    oldestReturnId:string, 
    hasOldReview:boolean, 
    guide_id:string, 
    grade:number
) => [
    {
      text: "Return guide",
      condition: !isReturned,
      backgroundColor: "#F1F1F1",
      href: `/guide/${guide_id}`,
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
  
  export const getReturnStatus = (isReturned:boolean, needsGrading:boolean, vote:string, guide_id:string)=>   [
    {
      text: "You have not returned the guide yet",
      condition: !isReturned,
      backgroundColor: "#F1F1F1",
      backgroundImg: "none",
      backgroundRepeat: "no-repeat",
      href: `/guide/${guide_id}?isReturned=${isReturned}`,
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
      text: "You did not pass this guide, Try again!",
      condition: vote === "no pass",
      backgroundColor: "#F99F9D",
      backgroundImg: `url("x.svg")`,
      backgroundRepeat: "no-repeat",
      href: `/guide/${guide_id}`,
    },
    {
      text: "You have passed this guide, Well Done!",
      condition: vote === "pass",
      backgroundColor: "#B5E2A8",
      backgroundImg: `url("check.svg")`,
      backgroundRepeat: "no-repeat",
      href: `/guide/${guide_id}?isReturned=${isReturned}`,
    },
    {
      text: "Your guide was recommended to Hall of fame, Well Done!",
      condition: (vote === "recommend to Hall of fame"),
      backgroundColor: "#A5A6F6",
      backgroundImg: `url("star.svg")`,
      backgroundRepeat: "no-repeat",
      href: `/guide/${guide_id}?isReturned=${isReturned}`
    },
    {
      text: "Waiting until someone reviews your project",
      condition: !vote,
      backgroundColor: "#B5E2A8",
      backgroundImg: `url("hourglass.svg")`,
      backgroundRepeat: "no-repeat",
      href: `/guide/${guide_id}?isReturned=${isReturned}`,
    },
  ];