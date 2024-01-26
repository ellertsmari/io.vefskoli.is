"use client"

import { NextUpContainer, Title, NextUpCard, StyledLink } from "./nextUp.style";

type guideType = {
  _id: string;
  title:string;
  module:{
    title:string
  };
}

type Props = {
  guides: guideType[]
}

const NextUp = ({guides}: Props) => {
    return (
      <>
        <NextUpContainer>
        <Title>Next up</Title>
        {guides.slice(0, 3).map((guide: guideType) => {
          return (
            <NextUpCard title={guide.title} key={guide._id}>
              <StyledLink href={`/guide/${guide._id}`} className="next">
                <h3>Module {guide.module.title.slice(0, 1)}</h3>
                <h4>{guide.title}</h4>
              </StyledLink>
            </NextUpCard>
          );
        })}
        </NextUpContainer>
        </>
    );
  }
  
export default NextUp;

