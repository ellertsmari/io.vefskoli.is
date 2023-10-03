'use client';
import { AggregatedGuide } from '@/utils/types/types';
import GuideCard from '@/components/guideCard';
import { GuidesContainer, Container } from '@/styles/pageStyles/guides.styles';
import Dropdown from '@/components/dropDown';
import { useEffect, useState } from 'react';
import useLocalStorage from '@/utils/useLocalStorage';

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

  const [module, setModule] = useState<string>("");
//This works but there in an error "Error: Text content does not match server-rendered HTML." "Warning: Text content did not match. Server: "MODULE 3" Client: "MODULE 1""
const [moduleSelected, setModuleSelected] = useLocalStorage("Selected Module", {selected:""})

  const {selected} = moduleSelected

  return (
    <Container>
          <Dropdown
            options={options}
            selected={selected}
            setSelected={(s) => setModuleSelected({selected:s})}
          />
   
          <div>{module}</div>
          
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
          </GuidesContainer>
        </Container>
  )
}

export default Guides;