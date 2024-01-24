import { connectToDatabase } from '@/utils/mongoose-connector';
import { MainContent } from '@/components/mainLayout';


export default async function people () {

    return(
        <MainContent>
            <h1>This is the people page</h1>
        </MainContent>
    )
}