import { connectToDatabase } from "@/utils/mongoose-connector";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { ObjectId } from "mongodb";
import { MainContent } from "@/components/mainLayout"; //mainlayout.tsx
import { Resources } from "@/models/resources";
import { TopContainer, DropdownContainer, ModuleTitle } from "./styles";
import Dropdown from "@/components/dropDown/dropDown";
import { useState, useEffect } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import useUser from "@/utils/useUser";
import { useSearchParams } from "next/navigation";
import { AggregatedGuide } from "@/utils/types/types";
import CsrButton from "@/components/buttons/csrButton";

// //THESE props should point to the right place. I don't know if we can use AggregatedGuide in the same way for Resources
// type Props = {
//   guides: AggregatedGuide[];
// }


// const Guides = ({guides}:Props) => {
//   const options = [
//     "MODULE 0",
//     "MODULE 1",
//     "MODULE 2",
//     "MODULE 3",
//     "MODULE 4",
//     "MODULE 5",
//     "MODULE 6",
//     "MODULE 7",
//   ];


//   const { user } = useUser();
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");
  
//   //SELECTION MODULE
//   const moduleParam = searchParams.get("module");
//   const [module, setModule] = useState<string>(moduleParam || "");
//   const [moduleSelected, setModuleSelected] = useLocalStorage("Selected Module",{ selected: moduleParam || "MODULE 1" });

//   const { selected } = moduleSelected;
//   const option = (selected: string) => {
//     setModuleSelected({ selected });
//   };

//   //THIS FUNCTION needs to be reworked for RESOURCES
//   //Function that filters which guides should be displayed depending on a module and therefore which grades for the guides
//   const filteredRescources = guides.filter((guide: AggregatedGuide) => {
//     const isInModule = guide.module.title[0] === selected[selected.length - 1];
//     if (!category) return isInModule;
//     return isInModule && guide.category === category;
//   });
// }

//This is a serverside component that mostly handles data fetching and passing it to the Resources component
const getResources = async (user: OmitPassword | string ) => {
  await connectToDatabase();
  if (!user) return null;
  const userId =new ObjectId((user as OmitPassword)._id);
  try{
    const resources = await Resources.find({});
    
    
     return resources;
   } catch (e) {
     console.log(e);
   }
  
};

const resources = async () => {
  const user: OmitPassword | string = await useServerUser();
  const resources: any[] | undefined | null = await getResources(user);
  if (!resources) return <>No resources found</>;
  console.log(resources)

  // //DO WE NEED THIS?  SHOULD this be in another file. use client and then server side?
  // useEffect(() => {
  //   //if the module in the url canges and is different from the localStorage, change the selected module.
  //   moduleParam && setModuleSelected({ selected: moduleParam });
  // }, [moduleParam]);

  return (
    <>
      <MainContent>
        {/*<TopContainer>
          <DropdownContainer>
            <Dropdown options={options} selected={selected} setSelected={option} />
            <ModuleTitle>{module.substring(3)}</ModuleTitle>
          </DropdownContainer>
      </TopContainer> */}
        {resources.map(resource => {
          return (
            <div key={resource._id}><a href={resource.link}>{resource.description}</a></div>
          )
         })}
     </MainContent>
    </>
  );
};

export default resources;



