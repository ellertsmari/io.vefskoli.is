import { Guide } from '@/models/guide';
import { connectToDatabase } from '@/utils/mongoose-connector';
import Admin from '@/components/guides/admin';

const getGuides = async () => {
  connectToDatabase();
  return await Guide.find({});
}
const Page = async () => {
  const guideArr = await getGuides();
  return (
    <div>
      <Admin guides={JSON.parse(JSON.stringify(guideArr))}/>
    
    </div>
  )
}

export default Page