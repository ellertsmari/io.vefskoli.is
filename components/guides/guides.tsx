'use client';
import { AggregatedGuide } from '@/utils/types/types';
import GuideCard from '@/components/guideCard/guideCard';
import { GuidesContainer, Container } from './guides.styles';
import Dropdown from '@/components/dropDown/dropDown';
import { useState, useEffect } from 'react';
import useLocalStorage from '@/utils/useLocalStorage';
import CsrButton from '@/components/buttons/csrButton';
import useUser from '@/utils/useUser';
import { useSearchParams } from 'next/navigation';

type Props = {
  guides: AggregatedGuide[];
}  



const Guides = ({guides}:Props) => {
  const options = [
    "MODULE 0",
    "MODULE 1",
    "MODULE 2",
    "MODULE 3",
    "MODULE 4",
    "MODULE 5",
    "MODULE 6",
    "MODULE 7",
  ];
  const moduleNames = [
    "Preparation",
    "Introductory Course",
    "Community & Networking",
    "The fundamentals",
    "Connecting to the World",
    "Back-end & Infrastructure",
    "Growing complexity",
    "Exploration",
  ];
  const { user } = useUser()
  
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const moduleParam = searchParams.get("module");
  console.log("this is module from url;",moduleParam)
  const [module, setModule] = useState<string>(moduleParam || "");
  const [moduleSelected, setModuleSelected] = useLocalStorage("Selected Module", {selected: moduleParam || "MODULE 1"})



  const {selected} = moduleSelected
  const test = (selected:string) => {
    console.log(selected)
    setModuleSelected({selected})
  }
  let isTeacher = false;
  if  (user) isTeacher = user.role === "teacher"

  useEffect(() => { //if the module in the url canges and is different from the localStorage, change the selected module.
    moduleParam && setModuleSelected({selected: moduleParam})
  }, [moduleParam])
  return (
    <Container>
      <Dropdown
        options={options}
        selected={selected}
        setSelected={test}
      />

      <div>{module}</div>
      
      <GuidesContainer>
        {guides.filter((guide:AggregatedGuide)=>{
          const isInModule = guide.module.title[0]===selected[selected.length-1]
          if(!category) return isInModule
          return isInModule && guide.category===category
          
        })
        .map((guide: AggregatedGuide, nr: number) => {
          if(guide.module.title!=module) setModule(guide.module.title)
          return (
            <GuideCard
              key={guide._id.toString()}
              guide={guide}
              nr={nr}
            />
        )})}
        {isTeacher //TODO move the button inside the guide and style it somehow differently
          && <>
          <GuideCard
            guide={{title:"Create Guide", description:"Create a new guide", userReviews:[{}], otherReviews:[{}], userReturns:[{}]} as AggregatedGuide}
            nr={-1}
          />
          <CsrButton module={module}></CsrButton> 
        </>}
      </GuidesContainer>
    </Container>
  )
}

export default Guides;