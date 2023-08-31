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
  const userId = user._id;
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
          // other fields you want to display
          hasUserReturned: { $gt: [{ $size: '$userReturns' }, 0] },
          hasUserReviewed: { $gt: [{ $size: '$userReviews' }, 0] },
          hasOtherReviews: { $gt: [{ $size: '$otherReviews' }, 0] }
        }
      }
    ]).exec();
    console.log(guides);
  } catch (e) {
    console.log(e);
  }
  
  
  return guides;
};

const guides = async () => {
  const guides = await getGuides();


  return (<>temporary testing</>)
  /*
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
  );*/
};

export default guides;



