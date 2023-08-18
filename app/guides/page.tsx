import AnimatedBackground from "@/components/animatedBackground"
import { GuidesContainer, Layout } from "../../styles/pageStyles/guides.styles";
import GuideCard from "@/components/guideCard";

import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";


const getGuides = async () => {
    await connectToDatabase();
    const guides: GuideType[] = await Guide.find({});
    return guides;
}

const guides = async () => {
    const guides = await getGuides();
    return (
        <>
        <AnimatedBackground/>
        <Layout>
            <GuidesContainer> 
            {guides.map((guide:GuideType, nr:number) => (
                <GuideCard guide={guide} nr={nr}/>
            ))}
            </GuidesContainer>
        </Layout>
        </>
    );
}
  
 export default guides;