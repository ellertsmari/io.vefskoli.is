import AnimatedBackground from "@/components/animatedBackground";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Return, ReturnType } from "@/models/return";
import { GuideType } from "@/models/guide";
import { UserType } from "@/models/user";
//populating the guide and owner fields:
import '@/models/user'; //this is needed so that the user model is registered
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
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { MainContent } from "@/components/mainLayout";

const getReturn = async (id: string) => {
  

  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
 
  
  const objectId = new Types.ObjectId(id);
  await connectToDatabase();
  type OmitGuideFromReturn = Omit<ReturnType, 'guide'| 'owner'>; //because we want the guide populated but not the id
  type GuideWithId = Omit<GuideType, '_id'> & { _id: string };
  type OwnerWithId = Omit<UserType, '_id'> & { _id: string };
 
  type ReturnWithGuide = OmitGuideFromReturn & {
    guide: GuideWithId;
    owner: OwnerWithId;
    _id: string;
  };
  const r: ReturnWithGuide | null = await Return.findOne({ _id: objectId }).populate(['guide','owner']) as ReturnWithGuide | null;
  await Return.findByIdAndUpdate(objectId, { reviewedAt: new Date() } );

  return r; 
}

const review = async ({params} : {params: { id: string}}) => {
  // TODO: mark return as reviewed when the page is loaded and put a timer on it
  // to mark it as not reviewed after maybe an hour or two if the rewiew has not been submitted by then
  const user : OmitPassword | string = await useServerUser();
  if (!user) {
    return <>You need to be logged in to view this page</>;
  }
  if(typeof user === "string") {
    return <>{user}</>;
  }
  // make a styled div with contenteditable that looks nice:
 

  const r = await getReturn(params.id);
  if (!r) {
    return <><h1>Guide not found</h1> <h2>{params.id}</h2></>
  }

  return (
    <>
        <MainContent style={{flexDirection:"row"}}>
          <ReturnDetailsSection>
            <SectionTitle>Return Details</SectionTitle>
            {r.guide.title === "TypeScript In The Browser - Web APIs (24 - 28h.)" && 
            
              <>
                <SubTitle>
                  This guide was returned by <span style={{color:"#6563EB"}}>{r.owner.name}</span> please contact them either through slack
                  or in the classroom to make the review.
                </SubTitle>
                <MainText style={{marginBottom:"1000px"}}>
                  <a target="_blank" href="https://drive.google.com/file/d/1L2U6Tk57qiWukHLEy10zQnH7Wz-DOguw/view?usp=sharing">Here </a> 
                  is a very nice document where you can see how you could
                  prepare for your meeting and what you could talk about
                </MainText>
              </>
            }
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
              <LinkText target="_blank" href={r.projectUrl}>{r.projectUrl}</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Live Version</SubTitle>
              <LinkText target="_blank" href={r.liveVersion}>Click here</LinkText>
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
             
            </ReviewFrame>
            <ReviewComment returnId={JSON.parse(JSON.stringify(r._id))} userId={user._id} guideId={JSON.parse(JSON.stringify(r.guide._id))} />

          </ReviewSection>
        </MainContent>
    </>
  );
};

export default review;
