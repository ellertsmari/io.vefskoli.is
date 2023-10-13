'use client';
import { AggregatedGuide } from '@/utils/types/types';
import GuideCard from '@/components/guideCard/guideCard';
import { GuidesContainer, Container, ModuleTitle, DropdownContainer } from './guides.styles';
import Dropdown from '@/components/dropDown/dropDown';
import { useEffect, useState } from 'react';
import useLocalStorage from '@/utils/useLocalStorage';
import CsrButton from '@/components/buttons/csrButton';
import useUser from '@/utils/useUser';

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
  const { user } = useUser()
  const [module, setModule] = useState<string>("");
//This works but there in an error "Error: Text content does not match server-rendered HTML." "Warning: Text content did not match. Server: "MODULE 3" Client: "MODULE 1""
const [moduleSelected, setModuleSelected] = useLocalStorage("Selected Module", {selected:""})

  const {selected} = moduleSelected
  const test = (selected:string) => {
    console.log(selected)
    setModuleSelected({selected})
  }
  let isTeacher = false;
  if  (user) isTeacher = user.role === "teacher"
  return (
    <Container>
      <DropdownContainer>
          <Dropdown
            options={options}
            selected={selected}
            setSelected={test}
          />
   
          <ModuleTitle>{module}</ModuleTitle>
        </DropdownContainer>
          
          <GuidesContainer>
            {guides.filter((guide:AggregatedGuide)=>guide.module.title[0]===selected[selected.length-1])
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