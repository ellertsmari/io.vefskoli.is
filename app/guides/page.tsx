import AnimatedBackground from "@/components/animatedBackground";
import { Layout } from "../../styles/pageStyles/guides.styles";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "@/models/guide";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { ObjectId } from "mongodb";
import type { AggregatedGuide } from "@/utils/types/types";
import Guides from "@/components/Guides";

//This is a serverside component that mostly handles data fetching and passing it to the Guides component
const getGuides = async () => {
  await connectToDatabase();
  const user: OmitPassword | string = await useServerUser();
  if (!user) return null;
  const userId =new ObjectId((user as OmitPassword)._id);
  try{
    const guides = await Guide.aggregate([
      {
        $lookup: {
          from: 'returns',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $eq: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'userReturns' //to be able to check if user has returned the guide
        }
      },
      {
        $lookup: {
          from: 'returns',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $ne: ['$owner', userId] }
                  ]
                }
              }
            },
            {
              $sort: {
                reviewedAt: 1, // Ascending order by reviewedAt
                createdAt: 1  // Ascending order by createdAt
              }
            }
          ],
          as: 'returnsToReview' // to be able to check if user has returns to review
        }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $eq: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'userReviews' // to be able to check if user has reviewed the guide
        }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { guideId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $and: [
                    { $eq: ['$guide', '$$guideId'] },
                    { $ne: ['$owner', userId] }
                  ]
                }
              }
            }
          ],
          as: 'otherReviews' // to be able to check if user has reviews to grade
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          _id: 1,
          module: 1,
          returnDate: { $arrayElemAt: ['$userReturns.createdAt', 0] },
          oldestReturnId: { $arrayElemAt: ['$returnsToReview._id', 0] },
          isReturned: { $gt: [{ $size: '$userReturns' }, 0] },
          isReviewed: { $gt: [{ $size: '$userReviews' }, 0] },
          isReviewedx2: { $gt: [{ $size: '$userReviews' }, 1] },
          otherReviews: 1,
          userReviews: 1,
        }
      }
    ]).exec();
    return guides;
  } catch (e) {
    console.log(e);
  }
  
  
  
};

const guides = async () => {
  const guides: AggregatedGuide[] | undefined | null = await getGuides();
  if (!guides) return <>No guides found</>;
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <Guides guides={JSON.parse(JSON.stringify(guides))}></Guides>
      </Layout>
    </>
  );
};

export default guides;



