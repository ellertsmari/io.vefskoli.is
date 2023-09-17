import AnimatedBackground from "@/components/animatedBackground";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide as G, GuideType } from "@/models/guide";
import { FilledButton } from "@/components/buttons/filledButton";
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
import { MouseEventHandler } from "react";
import ReturnForm from "@/components/returnFrom/returnForm";
const postGuide = async (guide:any) => {
  await connectToDatabase();
  const g = new G(guide);
  guide.references.forEach((ref: any) => {
    g.references.push(ref);
  });
  guide.classes.forEach((cl: any) => {
    g.classes.push(cl);
  });
  guide.resources.forEach((res: any) => {
    g.resources.push(res);
  });
  guide.knowledge.forEach((know: any) => {
    g.knowledge.push(know);
  });
  guide.skills.forEach((skill: any) => {
    g.skills.push(skill);
  });

  await g.save();
  return g;
}

const CreateGuide = async ({ params }: { params: { id: string } }) => {
 
  const materials = [{title:"edit materials", link:"edit link"}];
  const knowledge = [{knowledge:"edit knowledge"}];
  const skills = [{skill:"edit skill"}];

  const createGuide: MouseEventHandler<HTMLButtonElement> = async (e:React.MouseEvent<HTMLButtonElement>) => {
    const guide = {
      title: "edit title",
      description: "edit description",
      category: "edit category",
      references: [{name:"edit reference", link:"edit link", type:"edit type"}],
      themeIdea: {
        title: "edit theme idea title",
        description: "edit theme idea description",
      },
      resources: [{title:"edit resource", link:"edit link"}],
      createdAt: new Date(),
      updatedAt: new Date(),
      topicsList: ["edit topic"],
      module: "edit module",
      classes: materials,
      knowledge: knowledge,
      skills: skills,
    };
    const g = await postGuide(guide);
    console.log(g);
  };
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <Guide>
          <UpperWrapper>
          <MainInfoWrapper>
            <GuideTitle contentEditable={true}>Edit Title</GuideTitle>
            <GuideSubtitle>Description</GuideSubtitle>
            <GuideParagraph  contentEditable={true}>
              Edit Description
            </GuideParagraph>
            <GuideSubtitle>Example</GuideSubtitle>
            <GuideSubtitle  contentEditable={true}>Edit Theme Idea Title</GuideSubtitle>
            <GuideParagraph  contentEditable={true}>edit Theme Idea Description</GuideParagraph>
          </MainInfoWrapper>

          <SideOnfoWrapper>
            <SideFrame>
              <GuideSubtitle>Materials</GuideSubtitle>
              {materials.map((material) => {
                return (
                  <>
                    <MaterialLinks contentEditable={true} key={material.title} href="#">
                      {material.title}
                    </MaterialLinks><div contentEditable={true}>{material.link}</div>
                    <button onClick={()=>materials.push({title:"edit material", link:"edit link"})}>add material</button>

                  </>
                );
              })}
            </SideFrame>
            <SideFrame>
              <GuideSubtitle>Topics</GuideSubtitle>
              <ul>
                  return <li><GuideParagraph contentEditable={true}>Edit Topic List</GuideParagraph></li>;
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
            {knowledge.map((knowledge) => {
              return <li key={knowledge.knowledge}><GuideParagraph>{knowledge.knowledge}</GuideParagraph></li>;
            })}
          </ul><button onClick={()=>knowledge.push({knowledge:"edit knowledge"})}>add knowledge</button>
          </KnowledgeWrapper>
          <SkillsWrapper>
          <GuideParagraph>Skills</GuideParagraph>
          <ul>
            {skills.map((skill) => {
              return <li><GuideParagraph>{skill.skill}</GuideParagraph></li>;
            })}
          </ul><button onClick={()=>skills.push({skill:"edit skill"})}>add skill</button>
          </SkillsWrapper>
          </KnowledgeAndSkillsWrapper>
          </RequirementsWrapper>

          <div style={{display:"flex", width:"100%", justifyContent:"center", marginTop:"3rem"}}>
            <FilledButton onClick={createGuide}>RETURN</FilledButton>
          </div>
        </Guide>
        
      </Layout>
      
    </>
  );
};

export default CreateGuide;
