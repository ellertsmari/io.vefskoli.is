import AnimatedBackground from "@/components/animatedBackground";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide as G, GuideType } from "@/models/guide";
import { Types } from "mongoose";
import {
  Guide,
  GuideTitle,
  GuideParagraph,
  Layout,
  GuideSubtitle,
  MainInfoWrapper,
  SideOnfoWrapper,
  SideFrame,
  MaterialLinks,
  RequirementsWrapper,
  UpperWrapper,
  KnowledgeWrapper,
  SkillsWrapper,
  KnowledgeAndSkillsWrapper,
} from "@/styles/pageStyles/guide0.styles";
const getGuide = async (id: string) => {
  await connectToDatabase();
  const guide: GuideType | null = await G.findOne({ _id: id });
  console.log(guide);

  return guide;
  
}
const guide = async ({ params }: { params: { id: string } }) => {
  const g = await getGuide(params.id);
  if (!g) {
    return <><h1>Guide not found</h1> <h2>{params.id}</h2></>
  }
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <Guide>
          <UpperWrapper>
          <MainInfoWrapper>
            <GuideTitle>{g.title}</GuideTitle>
            <GuideSubtitle>Description</GuideSubtitle>
            <GuideParagraph>
              {g.description}
            </GuideParagraph>
            <GuideSubtitle>Example</GuideSubtitle>
            <h1>{g.title}</h1>
            <p>{g.description}</p>
          </MainInfoWrapper>

          <SideOnfoWrapper>
            <SideFrame>
              <GuideSubtitle>Materials</GuideSubtitle>

                  <MaterialLinks href="https://code.visualstudio.com/">How to set up VScode</MaterialLinks>

                <MaterialLinks href="https://www.freecodecamp.org/news/introduction-to-git-and-github/">How to set up Git</MaterialLinks>

                <MaterialLinks href="http://figma.com">Figma (the official page)</MaterialLinks>

                <MaterialLinks href="https://www.codecademy.com/article/visual-studio-code">
                    Getting started with HTML in VScode
                    </MaterialLinks>

                <MaterialLinks href="https://www.hostinger.com/tutorials/website/how-to-link-a-stylesheet-css-file-to-your-html-file">Basic CSS</MaterialLinks>

                <MaterialLinks href="https://designlab.com/figma-101-course/introduction-to-figma/">Getting started with Figma</MaterialLinks>

            </SideFrame>
            <SideFrame>
              <GuideSubtitle>Topics</GuideSubtitle>
              <ul>
                <li>
                  <GuideParagraph>UI design</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>HTML</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>CSS</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>installing software</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>Git</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>GitHub</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>Terminal or shell</GuideParagraph>
                </li>
                <li>
                  <GuideParagraph>IDE</GuideParagraph>
                </li>
              </ul>
            </SideFrame>
            <SideFrame>
              <GuideSubtitle>Tips</GuideSubtitle>
              <GuideParagraph>
                If you get stuck you can always contact us on Slack and we will
                reply to you as soon as we can. You can also ask us to do a
                “huddle” (a video call on Slack) with you and then we will find
                a time to do that.
              </GuideParagraph>
            </SideFrame>
          </SideOnfoWrapper>
          </UpperWrapper>
          <RequirementsWrapper>
          <GuideSubtitle>Requirements</GuideSubtitle>
          <KnowledgeAndSkillsWrapper>
          <KnowledgeWrapper>
          <GuideParagraph>Knoweldge</GuideParagraph>
          <ul>
            <li> <GuideParagraph>Getting to know and understand the system of Vefskólinn</GuideParagraph></li>
            <li> <GuideParagraph>Understand what HTML is</GuideParagraph></li>
            <li> <GuideParagraph>Understand what CSS is</GuideParagraph></li>
            <li> <GuideParagraph>Understand what Git is</GuideParagraph></li>
            <li> <GuideParagraph>Understand what Figma is</GuideParagraph></li>
          </ul>
          </KnowledgeWrapper>
          <SkillsWrapper>
          <GuideParagraph>Skills</GuideParagraph>
          <ul>
          <li><GuideParagraph>Be able to return guides on io.vefskoli.is</GuideParagraph></li>
          <li><GuideParagraph>Be able to set up tools for web development</GuideParagraph></li>
          <li><GuideParagraph>Be able to make a “hello world” website using those tools</GuideParagraph></li>
          </ul>
          </SkillsWrapper>
          </KnowledgeAndSkillsWrapper>
          </RequirementsWrapper>
        </Guide>
      </Layout>
    </>
  );
};

export default guide;
