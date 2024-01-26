import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { MainContent } from "@/components/mainLayout"; //mainlayout.tsx
import { VideoCardText, Title,TopContainer, GuidesContainer, DropdownContainer, ModuleTitle, VideoCard } from "./styles";
import { FilledButton } from "@/components/buttons";
import Modal from "@/components/modal/modal"
import DropdownResources from "@/components/dropDown/dropDownResource";

const resources = async () => {
  const user: OmitPassword | string = await useServerUser();
  if (!user) return <>Please login</>

  const response = await fetch("http://localhost:3000/api/zoomapi");  //this should eventually change to the io.vefskoli.is 
  const data = await response.json();
  if (!data || !data.meetings) return <>No resources found</>;
  console.log(data);

  // Define options for the dropdown. THis is assuming the recordings are an array. If it's not we have to structure differently. 
  const options = data.meetings.map(recording => recording.topic.substring(0, 8));  // should filter by fyrst 8 digits. 


/*Notes for what needs to be done so that the dropdownmenu works as it should. 
Gera object med key og property fyrir thad sem vid thurfum. key 8 stafir then property should be "this sentence"
that will then appear in the dropdown menu 
Also have to make it so that they only show one instance of eache 8 letters so the dropdown menu isn't 
repeating everything
*/

//module title prob not used

  return (
    <>
      <MainContent>
      <TopContainer>
        <DropdownContainer>
          <DropdownResources options={options} />
          <ModuleTitle></ModuleTitle>  
        </DropdownContainer>
      </TopContainer>
        <Title>Videos and Recordings</Title>
        <FilledButton>Drive</FilledButton>
        <GuidesContainer> {data.meetings.map(resource => {
          return (
            <VideoCardText> 
              <Modal/> 
            <VideoCard image="" key={resource._id}>{resource.description}</VideoCard>
            </VideoCardText>
          )
         })}</GuidesContainer>
        </MainContent>
    </>
  );
};

export default resources;



