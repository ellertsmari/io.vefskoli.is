
import AnimatedBackground from "@/components/animatedBackground"
import { GuidesContainer, Layout, Title, MainContainer } from "../../styles/pageStyles/guides.styles";
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

            <MainContainer>
            
            <GuidesContainer>
            {guides.map((guide:GuideType, nr:number) => (
                <>
                {/* <Title>{guide.module?.title}</Title> */}
                <GuideCard key={guide._id.toString()} guide={JSON.parse(JSON.stringify(guide))} nr={nr}/>
                </>
            ))}
            </GuidesContainer>
            </MainContainer>
        </Layout>
        </>
    );
}
  
 export default guides;