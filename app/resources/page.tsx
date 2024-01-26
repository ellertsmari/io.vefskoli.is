import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { MainContent } from "@/components/mainLayout"; //mainlayout.tsx
import { VideoCardText, Title,TopContainer, GuidesContainer, DropdownContainer, ModuleTitle, VideoCard } from "./styles";
import { FilledButton } from "@/components/buttons";
import Modal from "@/components/modal/modal"
import DropdownResources from "@/components/dropDown/dropDownResource";
import { getVideos } from "../api/zoomapi/route";


// need to define user
// need to get title for recordings
// need to define data


//This is a serverside component that mostly handles data fetching and passing it to the Resources component
const resources = async () => {
  const user: OmitPassword | string = await useServerUser();
  const resources: any[] | undefined | null = await getVideos(user);
  if (!resources) return <>No resources found</>;
  console.log(resources);

  const data = await getVideos(user);
  if (!data || !data.recordings) return <>No resources found</>;
  console.log(data);

  // Define options for the dropdown. THis is assuming the recordings are an array. If it's not we have to structure differently. 
  const options = data.recordings.map(recording => recording.title.substring(0, 8));  // should filter by fyrst 8 digits. 

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
        <GuidesContainer> {resources.map(resource => {
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



