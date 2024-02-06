'use client'; //this is a very dinamic component
import { GuideType } from "@/models/guide";
import { FilledButton } from "@/components/buttons/filledButton";
import {
  GuideParagraph,
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
} from "@/styles/pageStyles/guide.styles";
import { MouseEventHandler } from "react";
import { useState, useEffect } from "react";
import { ShortInput } from "@/components/inputs";
import MarkdownEditor from "@/components/markdownEditor/markdownEditor";
import Spinner from "@/components/spinner/spinner";
import { MainContent } from "@/components/mainLayout";
import useLocalStorage from "@/utils/useLocalStorage";




const moduleNames = [
  "0 - Preparation",
  "1 - Introductory Course",
  "2 - Community & Networking",
  "3 - The fundamentals",
  "4 - Connecting to the World",
  "5 - Back-end & Infrastructure",
  "6 - Growing complexity",
  "7 - Exploration",
  "8 - Internship",
]

const SaveGuide = ({ params }: { params: { id: string } } ) => {
 
  const [materials, setMaterials] = useLocalStorage("newGuideMaterials",[{title:"edit materials", link:"edit link"}]);
  const [knowledge, setKnowledge] = useLocalStorage("newGuideKnowledge",[{knowledge:"edit knowledge"}]);
  const [skills, setSkills] = useLocalStorage("newGuideSkills",[{skill:"edit skill"}]);
  //need to ignore ts errors because of the Mongoose specific types. We could maybe create a custom type for this
  const [guide, setGuide] = useLocalStorage<Partial<GuideType>>("newGuide",{
    title: "Guide Title",
    description: "edit description",
    category: "edit category",
    // @ts-ignore
    references: [{name:"edit reference", link:"edit link", type:"edit type"}],
    themeIdea: {
      title: "Example Title",
      description: "edit theme idea description",
    },
    // @ts-ignore
    resources: [{description:"this is not used", link:"edit link"}],
    createdAt: new Date(),
    updatedAt: new Date(),
    topicsList: "edit topicList",
    module: {title:moduleNames[parseInt(params.id)]},
    // @ts-ignore
    classes: materials,
    // @ts-ignore
    knowledge: knowledge,
    // @ts-ignore
    skills: skills,
    order:100,
  });
  console.log(params.id)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const saveGuide = async (url:string, method:string) => {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify(guide),
      });
      const data = await res.json();
      console.log("data is",data)
      localStorage.removeItem("newGuide");
      localStorage.removeItem("newGuideMaterials");
      localStorage.removeItem("newGuideKnowledge");
      localStorage.removeItem("newGuideSkills");
      setIsSubmitting(false);  
    }

    if (isSubmitting && (params.id.length < 4)) {
      const createGuide =  () => {
        console.log("creating guide")
        for (const key in guide) {
          //if the value starts with "edit"
          // @ts-ignore
          if (guide[key] && guide[key].toString().startsWith("edit")) {
            alert(`please fill in the ${key} field`);
            return;
        }}
        saveGuide("/api/guides", "POST");
      };
      createGuide();
    }
    if(isSubmitting && (params.id.length > 4)){
      saveGuide(`/api/guides/${params.id}`, "PUT");
    }
  },[isSubmitting]);
  
  useEffect(() => {
    const getGuide = async () => {
      const res = await fetch(`/api/guides/${params.id}`);
      const data = await res.json();
      console.log("params.id",params.id)
      console.log("data is",data)
      setGuide(data);
      setMaterials(data.classes.concat(data.resources));
      setKnowledge(data.knowledge);
      setSkills(data.skills);
    };
    if(!(params.id.length < 4)) getGuide();

  }, [params.id]);

  const handleInput = (e:React.SyntheticEvent) => {
    const {dataset, value, innerText} = e.target as HTMLInputElement | HTMLTextAreaElement;
    const text:string = value || innerText;
    const {name, object, arrayIndex} = dataset;
    //the ts ignoring should be fixed when we make the client specific types
    if(arrayIndex){
      // @ts-ignore
      const arr = guide[object] 
      // @ts-ignore
      const index = parseInt(arrayIndex);
      // @ts-ignore
      arr[index] = {...arr[index], [name]:text};
      // @ts-ignore
      setGuide({...guide, [object]:arr});
      return;
    }
    if(object){
      // @ts-ignore
      setGuide({...guide, [object]:{...guide[object], [name]:text}});
      return;
    }

    // @ts-ignore
    setGuide({...guide, [name]:text});
  }


  const submit: MouseEventHandler<HTMLButtonElement> = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
  };
  return (
    <>
        <MainContent>
          <UpperWrapper>
          <MainInfoWrapper>
            <ShortInput data-name="title" onBlur={handleInput} placeholder={guide.title} />
            <GuideSubtitle>Description</GuideSubtitle>
            <MarkdownEditor  value={guide.description!} onChange={(desc:string)=>setGuide({...guide, description:desc})} data-name="description"/>
            <GuideParagraph data-name="category" onBlur={handleInput} suppressContentEditableWarning={true} contentEditable={true}>
              {guide.category}
            </GuideParagraph>
            <GuideSubtitle>Example</GuideSubtitle>
            <ShortInput data-object="themeIdea" data-name="title" onBlur={handleInput} placeholder={guide.themeIdea?.title}/>
            <MarkdownEditor value={guide.themeIdea?.description!} data-object="themeIdea" onChange={(desc:string)=>setGuide({...guide, themeIdea:{title:guide.themeIdea!.title, description:desc}})} data-name="description"></MarkdownEditor>
          </MainInfoWrapper>

          <SideOnfoWrapper>
            <SideFrame>
              <GuideSubtitle>Materials</GuideSubtitle>
              {materials?.map((material, i) => {
                return (
                  <div key={material.link}>
                    <MaterialLinks data-object="classes" data-array-index={i} data-name="title" onBlur={handleInput} suppressContentEditableWarning={true} contentEditable={true} href="#">
                      {material.title}
                    </MaterialLinks>
                    <div data-object="classes" data-array-index={i} data-name="link" onBlur={handleInput} suppressContentEditableWarning={true} contentEditable={true}>
                      {material.link}
                    </div>
                  </div>
                );
              })}
              <FilledButton onClick={()=>setMaterials([...materials,{title:"edit material", link:"edit link"}])}>add material</FilledButton>
            </SideFrame>
            <SideFrame>
              <GuideSubtitle>Topics</GuideSubtitle>
              <ul>
                  <li><GuideParagraph data-name="topicsList" onBlur={handleInput} suppressContentEditableWarning={true} contentEditable={true}>{guide.topicsList}</GuideParagraph></li>;
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
            {knowledge?.map((k, i) => {
              return ( 
                <li key={i}>
                  <GuideParagraph 
                    data-object="knowledge" 
                    data-array-index={i} 
                    data-name="knowledge" 
                    onBlur={handleInput} 
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                  >
                    {k.knowledge}
                  </GuideParagraph>
                </li>
              );
            })}
          </ul>
          <button onClick={
            // @ts-ignore
            ()=>setKnowledge([...knowledge,{knowledge:"edit knowledge"}])
          }>add knowledge</button>
          </KnowledgeWrapper>
          <SkillsWrapper>
          <GuideParagraph>Skills</GuideParagraph>
          <ul>
            {skills.map((skill, i) => {
              return (
                <li key={i}>
                  <GuideParagraph 
                    data-object="skills" 
                    data-array-index={i} 
                    data-name="skill" 
                    onBlur={handleInput} 
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                  >
                    {skill.skill}
                  </GuideParagraph>
                </li>
              );
            })}
          </ul><button onClick={()=>setSkills([...skills,{skill:"edit skill"}])}>add skill</button>
          </SkillsWrapper>
          </KnowledgeAndSkillsWrapper>
          </RequirementsWrapper>

          <div style={{display:"flex", width:"100%", justifyContent:"center", marginTop:"3rem"}}>
            {isSubmitting?<Spinner></Spinner>:<FilledButton onClick={submit}>SAVE</FilledButton>}
          </div>
        </MainContent>
    </>
  );
};

export default SaveGuide;
