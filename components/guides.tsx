'use client';
import { AggregatedGuide } from '@/utils/types/types';
import GuideCard from '@/components/guideCard';
import { GuidesContainer, Container } from '@/styles/pageStyles/guides.styles';
import Dropdown from '@/components/dropDown';
import { useState } from 'react';

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
  const [selected, setSelected] = useState<string>(options[3]);
  const [module, setModule] = useState<string>("");
  
  return (
    <Container>
          <Dropdown
            options={options}
            selected={selected}
            setSelected={setSelected}
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