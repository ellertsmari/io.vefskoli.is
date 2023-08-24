import AnimatedBackground from "@/components/animatedBackground";
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

type Props = {
  //Return Details
  module: string;
  guide: string;
  date: string;
  url: string;
  liveVersion: string;
  comment: string;
  photo: string;

  //Review
};

const review: React.FC<Props> = ({
  module,
  guide,
  date,
  url,
  liveVersion,
  comment,
  photo,
}) => {
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <MainContainer>
          <ReturnDetailsSection>
            <SectionTitle>Return Details</SectionTitle>
            <Frame>
              <SubTitle>{module}</SubTitle>
              <MainText>{guide}</MainText>
            </Frame>
            <Frame>
              <SubTitle>Return Date</SubTitle>
              <MainText>{date}</MainText>
            </Frame>
            <Frame>
              <SubTitle>URL</SubTitle>
              <LinkText href={url}>{url}</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Live Version</SubTitle>
              <LinkText href={liveVersion}>{liveVersion}</LinkText>
            </Frame>
            <Frame>
              <SubTitle>Comment</SubTitle>
              <MainText>{comment}</MainText>
            </Frame>
            <Frame>
              <SubTitle>Photo</SubTitle>
              <Photo src={photo} />
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

          </ReviewSection>
        </MainContainer>
      </Layout>
    </>
  );
};

export default review;
