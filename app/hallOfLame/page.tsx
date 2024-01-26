//HALL OF LAME STUFF

'use client'

import FameCard from "@/components/fameCard/fameCard";
import { GuidesContainer } from "@/components/guides/styles";
import { MainContent } from "@/components/mainLayout";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { useEffect, useState } from "react";

type Review = {
  guide: GuideType;
  _id: string;
  'return': ReturnType;
}

const hallOfLame = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function logLameGuides() {
      const response = await fetch('/api/hallOfLame')
      const lameReview = await response.json()
      setData(lameReview)
      console.log(lameReview)
    }

    logLameGuides()
  }, [])

  return (
    <>
      <MainContent>
        <GuidesContainer>
          {data.map((review: Review) => {
            return (
              <FameCard
                key={review.guide.title.toString()}
                returnData={review.return}
                guide={review.guide}
              />
            )
          })}
        </GuidesContainer>
      </MainContent>
    </>
  )
};

export default hallOfLame;
