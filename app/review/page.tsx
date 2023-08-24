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
} from "@/styles/pageStyles/review.styles";

const review = () => {
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <MainContainer>
          <ReturnDetailsSection>
            <SectionTitle>Return Details</SectionTitle>
            <Frame>
                <SubTitle>Module 4</SubTitle>
                <MainText>Guide 4: Speciality, Figma - Animation (6h-8h)</MainText>
            </Frame>
            <Frame>
                <SubTitle>Return Date</SubTitle>
                <MainText>12/11/2022 @ 17h42m</MainText>
            </Frame>
            <Frame>
                <SubTitle>URL</SubTitle>
                <LinkText href="https://www.figma.com/file/sgvcca3grKDJAJgwrfKL/Animation-guide?node-id=uwe8%frA3">https://www.figma.com/file/sgvcca3grKDJAJgwrfKL/Animation-guide?node-id=uwe8%frA3</LinkText>
            </Frame>
            <Frame>
                <SubTitle>Live Version</SubTitle>
                <LinkText href="https://www.figma.com/file/sgvcca3grKDJAJgwrfKL/Animation-guide?node-id=uwe8%frA3">https://www.figma.com/file/sgvcca3grKDJAJgwrfKL/Animation-guide?node-id=uwe8%frA3</LinkText>
            </Frame>
            <Frame>
                <SubTitle>Comment</SubTitle>
                <LinkText href=""></LinkText>
            </Frame>
            <Frame>
                <SubTitle>Photo</SubTitle>
                
            </Frame>
          </ReturnDetailsSection>
          <ReviewSection><SectionTitle>Review</SectionTitle></ReviewSection>
        </MainContainer>
      </Layout>
    </>
  );
};

export default review;
