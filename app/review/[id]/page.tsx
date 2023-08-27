import AnimatedBackground from "@/components/animatedBackground";
import { FilledButton } from "@/components/buttons";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide as G, GuideType } from "@/models/guide";
import { Types } from "mongoose";
import {
  MainContainer,
  Layout,
  ReturnDetailsSection,
  ReviewSection,
  SectionTitle,
  Frame,
  SubTitle,
  MainText,
  LinkText,
  Photo,
  BulletList,
  ReviewFrame,
  Comment,
} from "@/styles/pageStyles/review.styles";
import { title } from "process";
import { Module } from "module";
import { MouseEvent } from "react";
import ReviewComment from "@/components/ReviewComment/ReviewComment";

// type Props = {
//   //Return Details
//   module: string;
//   guide: string;
//   date: string;
//   url: string;
//   liveVersion: string;
//   comment: string;
//   photo: string;

//   //Review
// };




const getGuide = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  const objectId = new Types.ObjectId(id);
  await connectToDatabase();
  const guide: GuideType | null = await G.findOne({ _id: objectId });
  return guide; 
}

const review = async ({params} : {params: { id: string}}) => {

  // make a styled div with contenteditable that looks nice:
 

  const g = await getGuide(params.id);
  if (!g) {
    return <><h1>Guide not found</h1> <h2>{params.id}</h2></>
  }

  return (
    <>
      <AnimatedBackground />
      <Layout>
        <MainContainer>
          <ReturnDetailsSection>
            <SectionTitle>Return Details</SectionTitle>
            <Frame>
              <SubTitle>{g.module.title}</SubTitle>
              <MainText>{g.title}</MainText>
            </Frame>
            <Frame>
              <SubTitle>Return Date</SubTitle>
              <MainText>{}</MainText>
            </Frame>
            <Frame>
              <SubTitle>URL</SubTitle>
              <LinkText>{}</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Live Version</SubTitle>
              <LinkText>Hello</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Comment</SubTitle>
              <MainText>Hello</MainText>
            </Frame>
            <Frame>
              <SubTitle>Photo</SubTitle>
              <Photo />
            </Frame>
          </ReturnDetailsSection>
          <ReviewSection>
            <SectionTitle>Review</SectionTitle>

            <ReviewFrame>
              <SubTitle>Requirements to Pass</SubTitle>
              <BulletList>
                <li>
                  Understand what you can gain from having even the simplest
                  animations in your prototype.
                </li>
                <li>
                  Ability to create simple and complex animations in figma.
                </li>
              </BulletList>
            </ReviewFrame>

            <ReviewFrame>
              <SubTitle>Your Feedback</SubTitle>
              <BulletList>
                <li>
                How can this work be improved/fixed?
                </li>
                <li>
                What was inspiring about it?
                </li>
              </BulletList>
            </ReviewFrame>

            <ReviewFrame>
              <SubTitle>Vote</SubTitle>
              <form>
                <input type="radio" />
                <label>Pass</label><br />
                <input type="radio" />
                <label>Hello</label><br />
                <input type="radio" />
                <label>Hello</label>
              </form>
            </ReviewFrame>
            <ReviewComment />

          </ReviewSection>
        </MainContainer>
      </Layout>
    </>
  );
};

export default review;
