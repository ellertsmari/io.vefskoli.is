import AnimatedBackground from "@/components/animatedBackground"
import { GuidesContainer, Layout } from "../../styles/pageStyles/guides.styles";
import Guide from "@/components/guideCard";

 const guides = () => {
    return (
        <>
        <AnimatedBackground/>
        <Layout>
            <GuidesContainer> 
            <Guide />
            </GuidesContainer>
        </Layout>
        </>
    );
 }
  
 export default guides;