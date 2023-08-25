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
import { FilledButton } from "@/components/buttons";
const getGuide = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  const objectId = new Types.ObjectId(id);
  await connectToDatabase();
  const guide: GuideType | null = await G.findOne({ _id: objectId });
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
            <GuideParagraph dangerouslySetInnerHTML={{ __html: g.description }}>
             
            </GuideParagraph>
            <GuideSubtitle>Example</GuideSubtitle>
            <h1>{g.title}</h1>
            <p dangerouslySetInnerHTML={{__html: g.description}}></p>
          </MainInfoWrapper>

          <SideOnfoWrapper>
            <SideFrame>
              <GuideSubtitle>Materials</GuideSubtitle>
              {g.classes.map((material) => {
                return (
                  <MaterialLinks href={material.link}>
                    {material.title}
                  </MaterialLinks>
                );
              })}
            </SideFrame>
            <SideFrame>
              <GuideSubtitle>Topics</GuideSubtitle>
              <ul>
                  return <li><GuideParagraph>{g.topicsList}</GuideParagraph></li>;
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
            {g.knowledge.map((knowledge) => {
              return <li><GuideParagraph>{knowledge.knowledge}</GuideParagraph></li>;
            })}
          </ul>
          </KnowledgeWrapper>
          <SkillsWrapper>
          <GuideParagraph>Skills</GuideParagraph>
          <ul>
            {g.skills.map((skill) => {
              return <li><GuideParagraph>{skill.skill}</GuideParagraph></li>;
            })}
          </ul>
          </SkillsWrapper>
          </KnowledgeAndSkillsWrapper>
          </RequirementsWrapper>
          <FilledButton style={{width:"100%"}}>RETURN</FilledButton>
        </Guide>
      </Layout>
    </>
  );
};

export default guide;
