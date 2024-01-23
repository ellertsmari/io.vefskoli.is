import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "@/models/guide";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import { ObjectId } from "mongodb";
import type { AggregatedGuide } from "@/utils/types/types";
import Guides from "@/components/guides/guides";
import CsrButton from "@/components/buttons/csrButton";
import { MainContent } from "@/components/mainLayout";

//This is a serverside component that mostly handles data fetching and passing it to the Resources component
const getResources = async (user: OmitPassword | string ) => {
  await connectToDatabase();
  if (!user) return null;
  const userId =new ObjectId((user as OmitPassword)._id);
  try{
    const resources = await Resources.aggregate([
//       {
//         $lookup: {
//           from: 'returns',
//           let: { guideId: '$_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ['$guide', '$$guideId'] },
//                     { $eq: ['$owner', userId] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: 'userReturns' //to be able to check if user has returned the guide
//         }
//       },
//       {
//         $lookup: {
//           from: 'returns',
//           let: { guideId: '$_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ['$guide', '$$guideId'] },
//                     { $ne: ['$owner', userId] }
//                   ]
//                 }
//               }
//             },
//             {
//               $lookup: {
//                 from: 'reviews',
//                 localField: '_id',  // return ID
//                 foreignField: 'return', // connecting return field in review schema
//                 as: 'associatedReviews'
//               }
//             },
//             {
//               $match: {
//                 'associatedReviews.owner': {
//                   $ne: userId  // Assuming userId is defined elsewhere in your script
//                 }
//               }
//             },
//             {
//               $sort: {
//                 reviewedAt: 1, // Ascending order by reviewedAt
//                 createdAt: 1   // Ascending order by createdAt
//               }
//             }
//           ],
//           as: 'returnsToReview' // to be able to check if user has returns to review
//         }
//       }
//       ,
//       {
//         $lookup: {
//           from: 'reviews',
//           let: { guideId: '$_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { 
//                   $and: [
//                     { $eq: ['$guide', '$$guideId'] },
//                     { $eq: ['$owner', userId] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: 'userReviews' // to be able to check how often a user has reviewed the guide
//         }
//       },
//       {
//         $lookup: {
//           from: 'reviews',
//           let: { guideId: '$_id' },
//           pipeline: [
//             // First, perform a lookup on the Return collection
//             {
//               $lookup: {
//                 from: 'returns',
//                 localField: 'return',
//                 foreignField: '_id',
//                 as: 'returnData'
//               }
//             },
//             // Unwind the array, so we can easily access the owner field
//             {
//               $unwind: '$returnData'
//             },
//             // Filter by guide and owner
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ['$guide', '$$guideId'] },
//                     { $ne: ['$owner', userId] },
//                     { $eq: ['$returnData.owner', userId] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: 'otherReviews'
//         }
//       },
//       {
//         $project: {
//           title: 1,
//           description: 1,
//           _id: 1,
//           module: 1,
//           userReturns: 1,
//           returnDate: { $arrayElemAt: ['$userReturns.createdAt', 0] },
//           oldestReturnId: { $arrayElemAt: ['$returnsToReview._id', 0] },
//           isReturned: { $gt: [{ $size: '$userReturns' }, 0] },
//           isReviewed: { $gt: [{ $size: '$userReviews' }, 0] },
//           isReviewedx2: { $gt: [{ $size: '$userReviews' }, 1] },
//           otherReviews: 1,
//           userReviews: 1,
//           category: 1,
//           order: 1,
//         }
//       },
//       {
//         $sort: {
//           order: 1, // Ascending order by order
//         }
//       }
     ]).exec();
     return resources;
   } catch (e) {
     console.log(e);
   }
  
};

const resources = async () => {
  const user: OmitPassword | string = await useServerUser();
  const resources: any[] | undefined | null = await getResources(user);
  if (!resources) return <>No resources found</>;
  return (
    <>
      <MainContent>
        <Guides guides={JSON.parse(JSON.stringify(resources))}></Guides>
      </MainContent>
    </>
  );
};

export default resources;



