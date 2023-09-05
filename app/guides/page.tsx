import React from "react";

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
import useServerUser from "@/utils/useServerUser";
import { UserType } from "@/models/user";
import { ObjectId } from "mongodb";
import type { AggregatedGuide } from "@/utils/types/types";

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
  //const guides: GuideType[] = await Guide.find({});
  const user = await useServerUser() as UserType & { _id: string };
  const userId =new ObjectId(user._id);
  //console.log(userId);
  try{
    const guides = await Guide.aggregate([
      {
        $lookup: {
          from: 'returns',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $eq: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'userReturns'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $eq: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'userReviews'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $ne: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'otherReviews'
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          _id: 1,
          module: 1,
          // other fields you want to display
          isReturned: { $gt: [{ $size: '$userReturns' }, 0] },
          isReviewed: { $gt: [{ $size: '$userReviews' }, 0] },
          gotReviews: { $gt: [{ $size: '$otherReviews' }, 0] },
          grade: { $arrayElemAt: ["$userReviews.grade", 0] }
        }
      }
    ]).exec();
    return guides;
  } catch (e) {
    console.log(e);
  }
  
  
  
};

// const filterGuides = getGuides.filter(guide => guide.module === selectedModule)


const guides = async () => {
  const guides: AggregatedGuide[] | undefined = await getGuides();
  if (!guides) return <>No guides found</>;
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <MainContainer>
          <Dropdown
            options={options}
          />
          <GuidesContainer>
            {guides.map((guide: AggregatedGuide, nr: number) => (
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



