import AnimatedBackground from "@/components/animatedBackground";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Return, ReturnType } from "@/models/return";
import { GuideType } from "@/models/guide";
import "@/models/guide"; //this is needed so that the guide model is registered
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
} from "@/styles/pageStyles/review.styles";
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
  type OmitGuideFromReturn = Omit<ReturnType, 'guide'>;

  type ReturnWithGuide = OmitGuideFromReturn & {
    guide: GuideType;
  };
  const r: ReturnWithGuide | null = await Return.findOne({ _id: objectId }).populate('guide') as ReturnWithGuide | null;
  return r; 
}

const review = async ({params} : {params: { id: string}}) => {

  // make a styled div with contenteditable that looks nice:
 

  const r = await getGuide(params.id);
  if (!r) {
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
              <SubTitle>{r.guide.module.title}</SubTitle>
              <MainText>{r.guide.title}</MainText>
            </Frame>
            <Frame>
              <SubTitle>Return Date</SubTitle>
              <MainText>{r.createdAt.toLocaleDateString()}</MainText>
            </Frame>
            <Frame>
              <SubTitle>URL</SubTitle>
              <LinkText>{r.projectUrl}</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Live Version</SubTitle>
              <LinkText href={r.liveVersion}>Click here</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Comment</SubTitle>
              <MainText>{r.comment}</MainText>
            </Frame>
            <Frame>
              <SubTitle>Photo</SubTitle>
              <Photo src={r.pictureUrl} />
            </Frame>
          </ReturnDetailsSection>
          <ReviewSection>
            <SectionTitle>Review</SectionTitle>

            <ReviewFrame>
              <SubTitle>Requirements to Pass</SubTitle>
              <BulletList>
                {r.guide.knowledge.map((know, index) => {
                  return <li key={index}>{know.knowledge}</li>;
                })}
                {r.guide.skills.map((skill, index) => {
                  return <li key={index}>{skill.skill}</li>;
                })}
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
                <label>pass</label><br />
                <input type="radio" />
                <label>no pass</label><br />
                <input type="radio" />
                <label>recommend to gallery</label>
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
