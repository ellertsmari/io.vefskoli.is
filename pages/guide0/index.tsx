import AnimatedBackground from "@/components/animatedBackground";
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
} from "../../styles/pageStyles/guide0.styles";

const guide0 = () => {
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <Guide>
          <UpperWrapper>
          <MainInfoWrapper>
            <GuideTitle>Guide for Entrance Exam</GuideTitle>
            <GuideSubtitle>Description</GuideSubtitle>
            <GuideParagraph>
              In this guide you will get to know the basics so that you can make
              a basic website with your group in the entrance exam. You will
              need to get to know a few tools and just focus on the basics that
              you need to be able to contribute to the project. You can dive
              deeper into things you are interested in. For example if you are
              interested in design you might want to spend some more time on
              Figma than HTML and CSS and if you are interested in coding you
              might want to get more familiar with VScode and GitHub. The tools
              you need are: VScode (or any other code editor of your choice) You
              need to install this on your computer Figma Sign up for it and use
              either the browser version or desktop version Create an account on
              GitHub If you have a Windows machine you will need to install
              Git-SCM Slack There are links to all these tools in the Material
              section here below.
            </GuideParagraph>
            <GuideSubtitle>Example</GuideSubtitle>
            <ul>
              <li>
                <GuideParagraph>
                  Design a “hello world” website in Figma
                </GuideParagraph>
              </li>
              <br />
              <li>
                <GuideParagraph>
                  Make the design into a live page with HTML and CSS
                </GuideParagraph>
              </li>
              <br />
              <li>
                <GuideParagraph>
                  In VScode or any other code editor
                </GuideParagraph>
              </li>
              <br />
              <li>
                <GuideParagraph>Upload the code to GitHub</GuideParagraph>
              </li>
              <br />
              <li>
                <GuideParagraph>
                  Use GitHub Pages to make it live
                </GuideParagraph>
              </li>
            </ul>
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

export default guide0;
