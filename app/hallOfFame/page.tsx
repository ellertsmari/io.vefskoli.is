"use client";
import { MainContent } from "@/components/mainLayout";
import { GuidesContainer } from "@/components/guides/styles";
import FameCard from "@/components/fameCard/fameCard";
import { GuideType } from "@/models/guide";
import { useState, useEffect } from "react";
type Review = {
  guide: GuideType;
  _id: string;
};
const guides = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function logFameGuides() {
      const response = await fetch("http://localhost:3000/api/hallOfFame");
      const fameReview = await response.json();
      setData(fameReview); // set data here
      console.log(fameReview);
    }
    logFameGuides();
  }, []); // empty dependency array means this effect runs once on mount

  return (
    <>
      <MainContent>
        <GuidesContainer>
          {data.map((review: Review) => {
            return (
              <FameCard
                key={review.guide.title.toString()}
                guide={review.guide}
              />
            );
          })}
        </GuidesContainer>
      </MainContent>
    </>
  );
};

export default guides;
