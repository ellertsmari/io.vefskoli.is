import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "@/models/guide";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { ObjectId } from "mongodb";
import type { AggregatedGuide } from "@/utils/types/types";
import Guides from "@/components/guides/guides";
import CsrButton from "@/components/buttons/csrButton";
import { MainContent } from "@/components/mainLayout";
import { Resources } from "@/models/resources";

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
  return (
    <>
      <MainContent>
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



