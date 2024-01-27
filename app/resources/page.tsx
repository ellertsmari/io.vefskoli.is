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

//We filter the videos with the first 8 digits in their title (topic). 
//To make sure the dropdown menu doesn't show only the first 8 digits we use key and property in an object. 
const nameDrop = {
  'Module 1' : 'MODULE 1',
  'Module 2' : 'Module 2',
  'Module 3' : 'Module 3',
  'Module 4' : 'Module 4',
  'Module 5' : 'Module 5',
  'Module 6' : 'Module 6',
  'Las palm' : 'Las Palmas',
  'Introduc' : 'Introduction',
};

// Define options for the dropdown. Set is used to ensure that only unique values are present in optionsSet
// This filters by the first 8 digits. 
const optionsSet = new Set(data.meetings.map(recording => nameDrop[recording.topic.substring(0, 8)] || recording.topic.substring(0, 8)));  
const options = Array.from(optionsSet);   //Array.from() is used to convert the Set back into an array which can be used as the options for dropdown. This will ensure that each module only appears once in the dropdown, regardless of how many videos it has.

  return (
    <div style={{position:"relative"}}>
      <MainContent>
        <TopContainer>
          <DropdownContainer>
            <DropdownResources options={options} />
            <ModuleTitle>Resources</ModuleTitle>  
          </DropdownContainer>
        </TopContainer>
        <Title>Videos and Recordings</Title>
        <a href="https://drive.google.com/drive/folders/1EZreV5U-Xubx2bVdZ6ULDQaazAgeGvKW?usp=sharing" target="_blank" rel="noopener"><FilledButton>Drive</FilledButton></a>  
        <GuidesContainer> {data.meetings.map(resource => {
          return (
              <Modal ZoomVideo= {resource}/>  //sko[a]   key={} 
          )
         })}</GuidesContainer>
        </MainContent>
    </div>
  );
};

export default resources;



