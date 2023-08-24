import React, { useState } from "react";

import AnimatedBackground from "@/components/animatedBackground";
import {
  GuidesContainer,
  Layout,
  MainContainer,
} from "../../styles/pageStyles/guides.styles";
import GuideCard from "@/components/guideCard";
import Dropdown from "@/components/dropDown";

import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";

const options = [
    "MODULE 0",
    "MODULE 1",
    "MODULE 2",
    "MODULE 3",
    "MODULE 4",
    "MODULE 5",
    "MODULE 6",
    "MODULE 7",
  ];


const getGuides = async () => {
  await connectToDatabase();
  const guides: GuideType[] = await Guide.find({});
  return guides;
};

const guides = async () => {
  const guides = await getGuides();



  return (
    <>
      <AnimatedBackground />
      <Layout>
        <MainContainer>
          <Dropdown
            options={options}
          />
          <GuidesContainer>
            {guides.map((guide: GuideType, nr: number) => (
              <GuideCard
                key={guide._id.toString()}
                guide={JSON.parse(JSON.stringify(guide))}
                nr={nr}
              />
            ))}
          </GuidesContainer>
        </MainContainer>
      </Layout>
    </>
  );
};

export default guides;



