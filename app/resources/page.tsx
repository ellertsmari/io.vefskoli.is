import { connectToDatabase } from "@/utils/mongoose-connector";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { ObjectId } from "mongodb";
import { MainContent } from "@/components/mainLayout"; //mainlayout.tsx
import { Resources } from "@/models/resources";
import { VideoCardText, Title,TopContainer, GuidesContainer, DropdownContainer, ModuleTitle, VideoCard } from "./styles";
import { FilledButton } from "@/components/buttons";
import Modal from "@/components/modal/modal"
import { useState } from "react";
import dynamic from 'next/dynamic';
import Dropdown from "@/components/dropDown/dropDown";
import DropdownResources from "@/components/dropDown/dropDownResource";
//const Dropdown = dynamic(() => import('@/components/dropDown/dropDown'), { ssr: false });

//This is a serverside component that mostly handles data fetching and passing it to the Resources component
const resources = async () => {
  const user: OmitPassword | string = await useServerUser();
  const resources: any[] | undefined | null = await getResources(user);
  if (!resources) return <>No resources found</>;
  console.log(resources);

  // Define options for the dropdown. THis is assuming the recordings are an array. If it's not we have to structure differently. 
  const options = data.recordings.map(recording => recording.title.substring(0, 8));

  // Define state for the selected option
  //const [selected, setSelected] = useState(options[0]); // initializes selected state to the first option

  return (
    <>
      <MainContent>
      <TopContainer>
          <DropdownContainer>
            <DropdownResources options={options} selected={selected} setSelected={setSelected} />
            <ModuleTitle></ModuleTitle>
      </DropdownContainer>
      </TopContainer>
        <Title>Videos and Recordings</Title>
        <FilledButton>Drive</FilledButton>
        <GuidesContainer> {resources.map(resource => {
          return (
            <VideoCardText> 
              <Modal/> 
            <VideoCard image="" key={resource._id}>{resource.description}</VideoCard>
            </VideoCardText>
          )
         })}</GuidesContainer>
       {/* <TopContainer>
          <DropdownContainer>
            <Dropdown options={options} selected={selected} setSelected={option} />
            <ModuleTitle>{module.substring(3)}</ModuleTitle>
  </DropdownContainer>
      </TopContainer>*/}
        </MainContent>
    </>
  );
};

export default resources;



